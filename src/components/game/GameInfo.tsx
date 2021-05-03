/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import { IDetailedGame } from '../../../common/game'
import { getDay, getMonth, getYear } from '../../dateParser';
import { useImage, ESize } from '../../hooks';
import MainScore from '../movie/MainScore';
import { Link } from "react-router-dom";
import Trailer from '../movie/Trailer';
import { ELoaderStatus, ILoader, Load } from '../Load';
import { preloadImage } from '../../utils';

interface IGameInfo{
    game: IDetailedGame;
    defaultName?: string;
}

export const GameInfo = ({game, defaultName}: IGameInfo) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/posters", `${game.id}.jpg`, ESize.Normal);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        preloadImage(imgsrc);
    }, []);

    useEffect(()=>{
        if(game.title !== defaultName){
            setLoader({ status: ELoaderStatus.Loaded });
        }
    }, [game.title]);
 /*
 <div className="movie-info-grid">               
                <div className="movie-info-grid-item">
                    {window.screen.width > 800 ?
                    (<Fragment>
                        {game.genres.map(g=>{
                            return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                        })}
                    </Fragment>
                    ):
                    (<Fragment></Fragment>)}
                    <p className="text">{game.summary}</p>
                    <p>Release date: {`${getDay(game.releaseDate.toString())} ${getMonth(game.releaseDate.toString())}  ${getYear(game.releaseDate.toString())}`}</p>
                    {game.production != null && game.production.length > 0 ?
                    <p>Developed by: {`${game.production}`}</p>:
                    <Fragment></Fragment>}
                    <p>Available on:</p>
                    <ul>
                        {game.platforms.map(p=>{
                            return <li key={`platform-${p.id}`}>{p.platformName}</li>
                        })}
                    </ul>           
                </div>
                {window.screen.width > 800 ?
                (<img src={imgsrc} onError={onImgError} className="poster" title={game.title} alt={`${game.title}-poster`} />):
                (<Fragment></Fragment>)}
 */
    return (
        <Load loader={loader}>
            <div>
            {parseInt(localStorage.getItem("permission")) > 1 ?
                (<Link to={`/rewer/editmovie?movieId=${game.id}`} >Edit the game's page</Link>): 
                (<Fragment></Fragment>)
            }
            </div>
            {window.screen.width > 800 ?
            (<div className="title-grid">
                <p className="title">{game.title}</p>
                <MainScore value={game.avgScore} />
            </div>) :
            (<div className="poster-grid">                
                <div>
                    <MainScore value={game.avgScore} />
                    <p className="title">{game.title}</p>
                    {(game.genres != null)?
                    (game.genres.map(g=> {
                        return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                    })):
                    (<Fragment></Fragment>)}    
                </div>
                <img src={imgsrc} onError={onImgError} className="poster" title={game.title} alt={`${game.title}-poster`} />
            </div>)}
                     
            <div>               
                <div>
                {window.screen.width > 800 ?
                    (<img src={imgsrc} onError={onImgError} className="floating-poster" title={game.title} alt={`${game.title}-poster`} />):
                    (<Fragment></Fragment>)}    
                    {window.screen.width > 800 ?
                    (<Fragment>
                        {game.genres.map(g=>{
                            return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                        })}
                    </Fragment>
                    ):
                    (<Fragment></Fragment>)}
                    <p className="text">{game.summary}</p>
                    <p>Release date: {`${getDay(game.releaseDate.toString())} ${getMonth(game.releaseDate.toString())}  ${getYear(game.releaseDate.toString())}`}</p>
                    {game.production != null && game.production.length > 0 ?
                    <p>Developed by: {`${game.production}`}</p>:
                    <Fragment></Fragment>}
                    <p>Available on:</p>
                    <ul>
                        {game.platforms.map(p=>{
                            return <li key={`platform-${p.id}`}>{p.platformName}</li>
                        })}
                    </ul>
                         
                </div>
                

                
            </div>
            <Trailer url={game.trailer} />
        </Load>
    )
}
