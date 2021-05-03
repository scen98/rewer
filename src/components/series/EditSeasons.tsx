/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect, useContext } from 'react'
import { IMovie } from '../../../common/movie';
import { ISeason } from '../../../common/season';
import { ISeries } from '../../../common/series';
import { ECallType, usePOST } from '../../callers/caller';
import { seasonPath } from '../../callers/seasonCaller';
import { replacedList } from '../../utils';
import { MessageContext } from '../Messenger';
import EditSeasonRow from './EditSeasonRow';
import EpisodeListEditor from './EpisodeListEditor';
interface IEditSeasons{
    series: ISeries;
    setSeasons: (seasons: ISeason[]) => void;
}

export const EditSeasons: React.FC<IEditSeasons> = ({series, setSeasons}: IEditSeasons) => {
    const [releaseYear, setReleaseYear] = useState("");
    const [selectedSeason, setSelectedSeason] = useState({ id: 0, seriesId: series.id, episodes: []});
    const [seasonCaller, signal] = usePOST();
    const { messenger } = useContext(MessageContext);

    useEffect(() => {
        return () => {
            signal.abort();
            messenger.clear();
        }
    }, [])

    async function addSeason(){
        let newSeason = {
            id: 0,
            seriesId: series.id,
            releaseYear: releaseYear,
            episodes: [],
            order: series.seasons.length+1
        };
        newSeason.id = await seasonCaller(newSeason, seasonPath.insertSeason, ECallType.INSERT);
        if(newSeason.id){
            setSeasons([...series.seasons, newSeason]);
        }
    }

    function updateSelectedSeason(newId: number){
        setSelectedSeason(series.seasons.find(s=> s.id === newId));
    }

    async function removeLastSeason(){
        const lastId = series.seasons[series.seasons.length-1].id;
        if(await seasonCaller({ id: lastId }, seasonPath.deleteSeason, ECallType.ISOK)){
            setSeasons(series.seasons.filter(s=> s.id !== lastId));
        } else {
            messenger.addFail("Server error: could not remove season.");
        } 
    }

    function replaceToSelectedSeason(episodes: IMovie[]){
        //find the season that is selected inside the series, then replaces it to a new season that is constructed by the selected season and its new episodes
        setSeasons(replacedList(series.seasons, series.seasons.find(s=> s.id === selectedSeason.id), {...selectedSeason, episodes: episodes } ));
        setSelectedSeason({...selectedSeason, episodes: episodes });
    }

    return (
        <div>
            <div className="adder-panel">
            <h3>Add new season: </h3>
                <label>Year</label>
                <input value={releaseYear} onChange={(e)=> { setReleaseYear(e.target.value);}} name="releaseYear" placeholder="release" />
                <button onClick={addSeason}>Add new season</button>
                {series.seasons.length > 0 ?
                (<button onClick={removeLastSeason} >Delete last season</button>) :
                (<Fragment></Fragment>)}
                
            </div>
            {series.seasons.map(s=>{
                return <EditSeasonRow key={s.id} selectedId={selectedSeason.id} onSelected={()=> updateSelectedSeason(s.id)} season={s} />
            })}
            {(series.seasons.length > 0) ? 
            (<Fragment>
                <h2 className="series-title">Episodes:</h2>
                <div>
                    <EpisodeListEditor season={selectedSeason} setEpisodes={(eps: IMovie[])=> { replaceToSelectedSeason(eps)}} summary={series.summary} />
                </div>
            </Fragment>): 
            (<Fragment></Fragment>)}
            
        </div>
    )
}
export default EditSeasons;