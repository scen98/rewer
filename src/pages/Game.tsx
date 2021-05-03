/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { ICast } from '../../common/cast';
import { IDetailedGame } from '../../common/game';
import { usePOST } from '../callers/caller';
import { gamePath } from '../callers/gameCaller';
import { isEntryReleased } from '../callers/movieCaller';
import ArticleSides from '../components/article/ArticleSides';
import CastList from '../components/cast/CastList';
import FeaturedGameSides from '../components/game/FeaturedGameSides';
import FeaturedTopRatedGames from '../components/game/FeaturedTopRatedGames';
import { GameInfo } from '../components/game/GameInfo';
import MovieReviewFeed from '../components/review/EntryReviewFeed';
import { MyReview } from '../components/review/MyReview';
import { getParameter } from '../urlManager';

export default function Game() {
    const [game, setGame] = useState<IDetailedGame>({ id: parseInt(getParameter("gameId")), title: "Loading...", releaseDate: "", summary: "...", genres: [], casts: [], avgScore: 0, platforms: [] });
    const [actors, setActors] = useState<ICast[]>([]);
    const [movieCaller, movieSignal] = usePOST({ id: game.id }, gamePath.selectDetailedGame);

    useEffect(()=>{
        document.body.scrollTop = 0; //react sometimes remembers the scroll location so I have to do this terribleness on certain pages
        document.documentElement.scrollTop = 0;
        if(game.id > 0) {
            requestGame();
        }

        return ()=>{
            movieSignal.abort();
        }
    }, []);

    useEffect(()=>{
        if(game != null) document.title = `${game.title} - Rewer`;
    }, [game.title]);

    async function requestGame(){
        const requestedGame = await movieCaller();
        if(requestedGame){
            setGame(requestedGame);
            setActors(requestedGame.casts.filter((c=> c.castTypeId > 3)));
        }
    }

    return (
        <Fragment>
            {window.screen.width > 800 ?
            (<div className="main-grid">
                <div className="left-item">
                    {isEntryReleased(game) ?
                    (<div className="side-container">
                        <MyReview entry={game} />
                    </div>):
                    (<Fragment></Fragment>)}                  
                    <div className="side-container" >  
                        <FeaturedGameSides />
                    </div>  
                    <div className="side-container" >  
                        <ArticleSides cutPos={70} length={2} />
                    </div>                 
                </div>
                <div className="main-item">
                    <GameInfo game={game} defaultName={"Loading..."} />
                    <MovieReviewFeed entry={game} />
                </div>
                <div className="right-item">
                    <div className="side-container">
                        <h3 className="center-text">Cast</h3> 
                        <CastList casts={actors} /> 
                    </div>         
                    <div className="side-container" >  
                        <FeaturedTopRatedGames />
                    </div>             
                </div>
            </div>) : 
            (<div className="main-container" >
            <GameInfo game={game} defaultName={"Loading..."} />
            <h2>Cast</h2>
            <CastList casts={actors} />
            {isEntryReleased(game) ?
            (<MyReview entry={game} />):
            (<Fragment></Fragment>)}            
            <MovieReviewFeed entry={game} />
        </div>) }
    </Fragment>
    )
}
