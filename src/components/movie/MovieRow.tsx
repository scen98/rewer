import React, { useState, useEffect, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Score } from './Score';
import { normalFormat } from '../../dateParser';
import { IMovie } from '../../../common/movie';
import { ESize, useCutter, useImage } from '../../hooks';
import "./movieStyle.css";
import { IGame } from '../../../common/game';

interface IMovieRow{
    movie: IMovie | IGame;
    cutPos?: number;
}

export const MovieRow: React.FC<IMovieRow> = ({movie, cutPos = 70}: IMovieRow) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/posters", `${movie.id}.jpg`, ESize.Small);
    const [imgClass, setImgClass] = useState("");
    const [summary] = useCutter(movie.summary, cutPos);
    useEffect(()=>{
        if(movie.avgScore > 6){
            setImgClass("high-poster");
        } else if(movie.avgScore > 3){
            setImgClass("medium-poster");
        } else if(movie.avgScore > 0) {
            setImgClass("low-poster");
        } else {
            setImgClass("");
        }
        if(window.screen.width > 600){

        }
    }, [movie]);
    return (
        <Link className="movie-row-grid" to={movie.runtime != null ? `/rewer/movie?movieId=${movie.id}` : `/rewer/game?gameId=${movie.id}`}>
            <img className={imgClass} src={imgsrc} alt={`poster-${movie.id}`} title={movie.title} onError={onImgError} />
            <div>
                <p className="row-title">{movie.title}</p>
                <p className="summary">{summary}</p>
            </div>
            {(new Date(movie.releaseDate) <= new Date()) ? 
            (<Score value={movie.avgScore} />) ? (movie.releaseDate == null) : 
            (<p></p>) :
            (<p className="movie-row-date">{normalFormat(movie.releaseDate.toString())}</p>)
            }
        </Link>
    )
}
