/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { IDetailedGame } from '../../../common/game';
import { usePOST } from '../../callers/caller';
import { gamePath } from '../../callers/gameCaller';
import { EntryDiv } from '../movie/EntryDiv';

export default function FeaturedGameSides() {
    const[featuredGames, setFeaturedGames] = useState<IDetailedGame[]>([]);
    const [caller, signal] = usePOST({ limit: 9 }, gamePath.selectLatestGames);
    
    useEffect(()=>{
        getLatestFeatures();
        return ()=>{
            signal.abort();
        }
    }, []);

    async function getLatestFeatures(){
        const games: IDetailedGame[] = await caller();
        const rnd = Math.floor(Math.random()*5);
        if(games){
            setFeaturedGames(games.slice(rnd, rnd+2)); 
        } 
    }

    return (
        <Fragment>
            <h3 className="center-text">Featured Games</h3>
                    <div className="double-grid">
                        {featuredGames.map(f=> {
                            return (<Link key={`featured-${f.id}`} to={`/rewer/game?gameId=${f.id}`}>
                                        <EntryDiv movie={f} />
                                    </Link>)
                        })}
                    </div>  
        </Fragment>
    )
}