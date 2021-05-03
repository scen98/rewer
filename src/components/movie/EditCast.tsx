/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useContext } from 'react'
import { onEnter, useBinder } from '../../hooks'
import { castPath, compareCastType } from '../../callers/castCaller';
import ArtistSelector from '../artist/ArtistSelector';
import CastTypeSelect from '../cast/CastTypeSelect'
import { EditCastList } from '../cast/EditCastList';
import { Link } from  "react-router-dom";
import { IMovie } from "../../../common/movie";
import { artistPath } from '../../callers/artistCaller';
import { IArtist } from '../../../common/artist';
import { ICast } from "../../../common/cast";
import { ISeason } from '../../../common/season';
import { ECallType, useGET, usePOST } from '../../callers/caller';
import { MessageContext } from '../Messenger';
import "../cast/castStyle.css";
import "../movie/movieStyle.css";
import { IGame } from '../../../common/game';

interface IEditCastList{
    entry: IMovie | IGame;
    setEntry: (movie: IMovie | IGame) => void;
    season?: ISeason;
    setEpisodes?: (episodes: IMovie[]) => void; 
}
export const EditCast: React.FC<IEditCastList> = ({entry, setEntry, season, setEpisodes}: IEditCastList) => {
    const [castTypes, setCastTypes] = useState([]);
    const [artists, setArtists] = useState([]);
    const [keyword, setKeyword, bindKeyword] = useBinder({search: ""});
    const [newCast, setNewCast, bindNewCast] = useBinder({id: 0, entryId: entry.id, artistId: 0, castTypeId: 1, name: "", artistName: "Not selected"});
    const [castCaller, castSignal] = usePOST({ keyword: keyword.search, limit: 25, offset: 0 }, artistPath.selectArtistsByKeyword);
    const [typeCaller, typeSignal] = useGET(castPath.getCastTypes);
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{     
        fetchRequests();
        return ()=>{
            castSignal.abort();
            typeSignal.abort();
            messenger.clear();
        }
    }, []);
    async function fetchRequests(){
        await Promise.all([requestCastTypes(), requestArtists()]);
    }
    async function requestCastTypes(){
        setCastTypes(await typeCaller());
    }
    async function requestArtists(){
        setArtists(await castCaller({ keyword: keyword.search, limit: 25, offset: 0 }, artistPath.selectArtistsByKeyword, ECallType.SELECT));
    }

    async function addCast(){
        if(newCast.artistId === 0 || newCast.artistId == null){
            messenger.addWarning("You have choose and artist first!", 5000);
            return false;
        } else{
            return await insertCastRequest();
        } 
    }

    async function insertCastRequest(){
        const newId = await castCaller(newCast, castPath.insertCast, ECallType.INSERT);
        if(newId){
            setCasts([...entry.casts, { ...newCast, id: newId }].sort(compareCastType));
            setNewCast({...newCast, id: 0, name: ""});
            return true;
        } else {
            messenger.addFail("Server error: could not add cast member.");
            return false;
        }
    }

    async function addToEachSeason(){
        if(newCast.artistId === 0 || newCast.artistId == null){
            messenger.addWarning("You have choose and artist first!", 5000);
            return false;
        }
        let newCasts = [];
        for(let episode of season.episodes) {
            newCasts.push({...newCast, movieId: episode.id });
        }
        newCasts = await castCaller({ casts: newCasts }, castPath.insertCasts, ECallType.SELECT);
        let newEpisodes = season.episodes;
        for(let episode of newEpisodes) {
            episode.casts.push(newCasts.find(c=> c.movieId === episode.id));
        }
        setEpisodes(newEpisodes); 
    }

    function setCasts(newCasts: ICast[]){
        setEntry({...entry, casts: newCasts});
    }

    function updateNewCastArtist(artist: IArtist){
        setNewCast({...newCast, artistId: artist.id, artistName: artist.name});
    }

    function updateNewCastType(newValue: string){
        setNewCast({...newCast, castTypeId: parseInt(newValue)});
    }

    useEffect(()=>{
        setNewCast({...newCast, entryId: entry.id});
    }, [entry.id]);
    
    return (
        <div>
            <div>
                <h2>Cast: </h2>
                <EditCastList castList={entry.casts} setCastList={setCasts} castTypes={castTypes} />
            </div>
            <div className="adder-panel">
                <h3>Add cast member:</h3>
                <span className="artist-name" >{newCast.artistName}</span>
                <CastTypeSelect typeList={castTypes} updateValue={updateNewCastType} />
                <input value={newCast.name} onChange={bindNewCast} name="name" placeholder="As" />
                <button onClick={addCast}>Add</button>
                {(entry.seasonId > 0)?
                (<button onClick={addToEachSeason}>Add to each episode</button>):
                (<Fragment></Fragment>)}
                <br/>
                <Link to="/rewer/editartist?artistId=0">Create new star</Link>
            </div>
            <div>
                <input value={keyword.search} name="search" onChange={bindKeyword} onKeyDown={(e)=> { onEnter(e, requestArtists); }} placeholder="Search" />
                <button onClick={requestArtists}>Search</button>
                <ArtistSelector artistList={artists} onSelectionChanged={updateNewCastArtist} />
            </div>
        </div>
    )
}