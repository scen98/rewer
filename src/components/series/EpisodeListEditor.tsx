/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useContext } from 'react'
import EditEpisodeRow from './EditEpisodeRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useBinder } from '../../hooks';
import EditMovieDetails from '../movie/EditMovieDetails';
import { replacedList } from '../../utils';
import { parseForInput } from '../../dateParser';
import { EditCast } from '../movie/EditCast';
import { IMovie } from '../../../common/movie';
import { ISeason } from '../../../common/season';
import { moviePath } from '../../callers/movieCaller';
import { compareEpisodes, seriesPath } from '../../callers/seriesCaller';
import { ECallType, usePOST } from '../../callers/caller';
import { MessageContext } from '../Messenger';

interface IEpisodeListEditor{
    season: ISeason;
    setEpisodes: (eps: IMovie[]) => void;
    summary: string;
}

export const EpisodeListEditor: React.FC<IEpisodeListEditor> = ({season, setEpisodes, summary}) => {
    const [selectedEpisode, setSelectedEpisode, bindEpisode] = useBinder<IMovie>({id: 0, title: "", summary: "", releaseDate: "", genres: [],  casts: []});
    const [caller, signal] = usePOST();
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        if(selectedEpisode.id > 0){
            setEpisodes(replacedList(season.episodes, season.episodes.find(s=> s.id === selectedEpisode.id), selectedEpisode));
        }
        return () =>{
            signal.abort();
            messenger.clear();
        }
    }, [selectedEpisode.casts]);

    async function addEpisode(){
        let newId: number;
        let newDate: Date;
        let newRunTime = 45;
        if(season.episodes.length > 0){
            newDate = new Date(season.episodes[season.episodes.length-1].releaseDate);
            newRunTime = season.episodes[season.episodes.length-1].runtime;
        } else if(!isNaN(parseInt(season.releaseYear))){
            newDate = new Date(`${season.releaseYear}-01-01`);
        } else {
            newDate = new Date("2015-01-01");
        }
        let newEpisode: IMovie = {
            id: 0,
            title: `Season ${season.order}: episode ${season.episodes.length+1}`,
            runtime: newRunTime,
            summary: summary,
            genres: [],
            releaseDate: parseForInput(newDate),
            seasonId: season.id,
            casts: []
        }
        newId = await caller(newEpisode, seriesPath.insertEpisode, ECallType.INSERT);
        if(newId > 0){
            setEpisodes([...season.episodes, {...newEpisode, id: newId}]);
            setSelectedEpisode({...newEpisode, id: newId});
        } else {
            messenger.addFail("Server error: could not add new episode.");
        }
    }

    async function saveEpisode(){
        if(await caller(selectedEpisode, moviePath.updateMovie, ECallType.ISOK)){
            messenger.addSuccess("Episode details saved.", 5000);
            setEpisodes(replacedList(season.episodes, season.episodes.find(s=> s.id === selectedEpisode.id), selectedEpisode));
        } else {
            messenger.addFail("Server error: series details could not be saved.");
        }
    }
    
    async function deleteEpisode(episodeId: number){      
        if(await caller({ id: episodeId }, moviePath.deleteMovie, ECallType.ISOK)){
            setEpisodes(season.episodes.filter(e=> e.id !== episodeId));
            if(selectedEpisode.id === episodeId) setSelectedEpisode({id: 0, title: "", summary: "", releaseDate: "", genres: [],  casts: []});
        } else {
            messenger.addFail("Server error: could not delete episode.")
        } 
    }

    function handleSelection(episode: IMovie){
        setSelectedEpisode(episode);
    }

    return (
        <div>
            {season.episodes.sort(compareEpisodes).map(e=>{
                return <EditEpisodeRow key={`${e.id}`} onDelete={()=>{ deleteEpisode(e.id)}} episode={e} selectedId={selectedEpisode.id} onSelect={()=>{ handleSelection(e)}} />
            })}
            <div onClick={addEpisode} className="add-episode"><FontAwesomeIcon icon={faPlusSquare} /></div>
            {(selectedEpisode.id > 0) ? 
            (<Fragment>
                <button onClick={saveEpisode}>Save</button>
                <EditMovieDetails movie={selectedEpisode} movieBinder={bindEpisode} />
                <EditCast entry={selectedEpisode} setEntry={setSelectedEpisode} season={season} setEpisodes={setEpisodes} />
                </Fragment>):
            (<Fragment></Fragment>)}
        </div>
    )
}
export default EpisodeListEditor;