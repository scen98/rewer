/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { IGame, IGamePlatform, IPlatfrom } from "../../../common/game";
import { ECallType, useGET, usePOST } from '../../callers/caller';
import { gamePath } from '../../callers/gameCaller';
import { compareGenresByName } from '../../callers/movieCaller';
import { MessageContext } from '../Messenger';

interface IPlatformAdder{
    game: IGame;
    setGamePlatforms: (platforms: IGamePlatform[])=>any;
}

export const PlatformAdder = ({game, setGamePlatforms}: IPlatformAdder) => {
    const [platformList, setPlatformList] = useState<IPlatfrom[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<IPlatfrom>({ id: 0, name: "" });
    const [getPlatforms, signal] = useGET(gamePath.getPlatforms);
    const [platformCaller, psgignal] = usePOST();
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        requestPlatforms();

        return ()=>{
            signal.abort();
            psgignal.abort();
        }
    }, []);

    async function requestPlatforms(){
        const platforms = await getPlatforms();
        if(platforms){
            platforms.sort(compareGenresByName);
            setPlatformList(platforms);
            setSelectedPlatform(platforms[0]);
        }
    }

    async function addPlatform(){
        const newId = await platformCaller({ entryId: game.id, platformId: selectedPlatform.id }, gamePath.insertGamePlatform, ECallType.INSERT);
        if(newId){
            setGamePlatforms([ ...game.platforms, { id: newId, entryId: game.id, platformId: selectedPlatform.id, platformName: selectedPlatform.name }]);
        } else {
            messenger.addFail("Server error: could not add platform.");
        }
    }

    async function deletePlatform(id: number){
        const success = await platformCaller({ id }, gamePath.deleteGamePlatform, ECallType.ISOK);
        if(success){
            setGamePlatforms(game.platforms.filter(p=> p.id !== id));
        } else {
            messenger.addFail("Server error: could not delete available platform.");
        }
    }

    return (
        <div>
        <h3>Available platforms:</h3>
        <div className= "edit-genre-container">
        {game.platforms.map(g=> {
            return <div key={`platform-${g.id}`} className="edit-genre"><span>{g.platformName}</span><button onClick={()=> { deletePlatform(g.id) }} ><FontAwesomeIcon icon={faTimes} /></button></div>
        })}
        </div>
        <div className="adder-panel">
            <select value={selectedPlatform.id} onChange={(e)=>{ setSelectedPlatform(platformList.find(p=> p.id === parseInt(e.target.value))) } } >
                {platformList.map(p=>{
                    return <option key={`platform-${p.id}`} value={p.id} >{p.name}</option>
                })}
            </select>
            <button onClick={()=>{ addPlatform() }}><FontAwesomeIcon icon={faPlus} />Add</button><br/>
        </div>      
    </div>
    )
}
