/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, Fragment } from 'react'
import { IGame } from '../../../common/game';
import { IMovie } from '../../../common/movie';
import { ESize, useImage, useRatio } from '../../hooks';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

interface IEntryDiv{
    movie: IMovie | IGame;
    isSelected?: boolean;
    isMobile?: boolean;
    type?: EntryDivType;
}

export enum EntryDivType{
    Movie,
    Game
}

export const EntryDiv: React.FC<IEntryDiv> = ({movie, isSelected = false, isMobile = false, type = EntryDivType.Movie}: IEntryDiv) => {
    const [mainClass, setMainClass] = useState("movie-container fade");
    const [imgsrc, onImgError, setImgSrc] = useImage("/rewer/uploads/posters", `0.jpg`, ESize.Medium, true);
    const [imgClass, setImgClass] = useState("");
    const [scoreClass, setScoreClass] = useState("");
    const scoreLine = useRef<HTMLDivElement>();
    const [img, listenImg, cleanUpImgListener] = useRatio<HTMLImageElement>(1.47);

    useEffect(()=>{
        listenImg();
        return ()=>{
            cleanUpImgListener();
        }
    }, []);

    useEffect(()=>{
        if(isSelected){
            setMainClass("movie-container fade selected-container")
        } else {
            setMainClass("movie-container fade")
        }
    }, [isSelected]);

    useEffect(()=>{
        if(movie.avgScore > 6){
            setImgClass("high-poster");
            setScoreClass("high");
            scoreLine.current.style.display = "block";
        } else if(movie.avgScore > 3){
            setImgClass("medium-poster");
            setScoreClass("medium");
            scoreLine.current.style.display = "block";
        } else if(movie.avgScore > 0){
            setImgClass("low-poster");
            setScoreClass("low");
            scoreLine.current.style.display = "block";
        } else {
            scoreLine.current.style.display = "none";
        }
    }, [movie]);

    useEffect(()=>{
        setImgSrc("/rewer/uploads/posters", `${movie.id}.jpg`);
    }, [movie.id]);

    return (
        <div className={mainClass}>
            <img ref={img} className={imgClass} src={imgsrc} alt={`${movie.title}-poster`} onError={onImgError} />       
            <div ref={scoreLine} className={scoreClass} >
                <span className="score-line">{ Math.round(movie.avgScore * 10)/10}</span>
            </div>
            {isMobile ? 
            (<Fragment></Fragment>):
            (<p className="movie-title">{movie.title}</p>)} 
            {isMobile ?
            (<Link className="open-movie-link" to={type === EntryDivType.Movie ? `/rewer/movie?movieId=${movie.id}` : `/rewer/game?gameId=${movie.id}`}><div className="open-movie-link"><FontAwesomeIcon icon={faAngleDoubleRight} /><FontAwesomeIcon icon={faAngleDoubleRight} /></div></Link>):
            (<Fragment></Fragment>)}
        </div>
    )
}

export default EntryDiv;