/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { IDetailedGame } from '../../../common/game';
import { usePOST } from '../../callers/caller';
import { gamePath } from '../../callers/gameCaller';
import { useCutter } from '../../hooks';
import { ELoaderStatus, ILoader, Load } from '../Load';
import GameRowList from './GameRowList';
import { GameSlider } from './GameSlider';


export default function LatestGames() {
    const [games, setGames] = useState<IDetailedGame[]>([]);
    const [selectedGame, setSelectedGame] = useState<IDetailedGame>({ id: 0, title: "", summary: "", casts: [], genres: [], releaseDate: "", platforms: []});
    const [gameCaller, signal] = usePOST({ limit: 9 }, gamePath.selectLatestGames);
    const [summary, isSummaryCut, cutSummary] = useCutter(selectedGame.summary, 400);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        requestGames();
        return ()=>{
            signal.abort();
        }
    }, []);

    useEffect(()=>{
        cutSummary(selectedGame.summary, 400)
    }, [selectedGame.summary]);

    async function requestGames(){
        const latests = await gameCaller();
        if(latests){
            setGames(latests.slice(0, 9));
            setSelectedGame(latests[0]);
            setLoader({ status: ELoaderStatus.Loaded });
        } else {
            setLoader({ status: ELoaderStatus.Error, text: "Server error: could not download data." });
        }
    }

    return (
        <Load loader={loader}>
            {window.screen.width > 600 ? 
            (<Fragment>
                <div className="highlight-grid">
                    <GameSlider games={games} onHover={(game)=> { setSelectedGame(game) }} selectedGame={selectedGame} />
                    <div className="highlighted-movie fade">
                        <h3>{selectedGame.title}</h3>
                        <p className="highlight-text">{summary}</p>
                        <p>Developed by: {selectedGame.production}</p>                       
                        <p>Available on: <span> </span>
                            {selectedGame.platforms.map(p=>{
                                return <span key={`platform-${p.id}`}>
                                    {p.platformName}
                                    {p === selectedGame.platforms[selectedGame.platforms.length - 1] ?
                                    <Fragment></Fragment> :
                                    <Fragment>, </Fragment>}
                                </span>
                            })}
                        </p>
                                     
                    </div>
                    </div>          
            </Fragment>) :
            (<GameRowList games={games} />)
            }
        </Load>
    )
}
