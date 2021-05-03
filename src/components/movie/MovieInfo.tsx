/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { IMovie } from '../../../common/movie';
import { getDay, getMonth, getYear } from '../../dateParser'
import { ESize, useImage } from '../../hooks';
import { preloadImage } from '../../utils';
import { ELoaderStatus, ILoader, Load } from '../Load';
import MainScore from './MainScore'
import "./movieStyle.css";
import Trailer from './Trailer';

interface IMovieInfo{
    movie: IMovie;
    defaultName?: string;
}

export const MovieInfo: React.FC<IMovieInfo> = ({movie, defaultName}) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/posters", `${movie.id}.jpg`, ESize.Normal);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        preloadImage(imgsrc);
    }, []);

    useEffect(()=>{
        if(defaultName !== movie.title){
            setLoader({ status: ELoaderStatus.Loaded });
        }
    }, [movie.title]);

    return (
        <Load loader={loader}>
            <div>
            {parseInt(localStorage.getItem("permission")) > 1 ?
                    (<Link to={`/rewer/editmovie?movieId=${movie.id}`} >Edit this movie's page</Link>) : 
                    (<Fragment></Fragment>)
                    }
            </div>
            {window.screen.width > 800 ?
            (<div className="title-grid">
                <p className="title">{movie.title}</p>
                <MainScore value={movie.avgScore} />
            </div>) :
            (<div className="poster-grid">                
                <div>
                    <MainScore value={movie.avgScore} />
                    <p className="title">{movie.title}</p>
                    {(movie.genres != null)?
                    (movie.genres.map(g=> {
                        return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                    })):
                    (<Fragment></Fragment>)}    
                </div>
                <img src={imgsrc} onError={onImgError} className="poster" title={movie.title} alt={`${movie.title}-poster`} />
            </div>)}
            <div>
                {window.screen.width > 800 ?
                (<img src={imgsrc} onError={onImgError} className="floating-poster" title={movie.title} alt={`${movie.title}-poster`} />):
                (<Fragment></Fragment>)}              
                <div>
                    {window.screen.width > 800 ?
                    (<Fragment>
                        {movie.genres.map(g=>{
                            return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                        })}
                    </Fragment>
                    ):
                    (<Fragment></Fragment>)}
                        <p className="text">{movie.summary}</p>
                        <p>Premier: {`${getDay(movie.releaseDate.toString())} ${getMonth(movie.releaseDate.toString())}  ${getYear(movie.releaseDate.toString())}`}</p>
                        <p>Runtime: {`${movie.runtime} minutes`}</p>
                        <p>Directed by: </p>
                        <ul>
                            {movie.casts.filter(c=> c.castTypeId === 1).map(m=>{
                                return <li key={`director-link-${m.artistId}`} ><Link className="star" to={`/rewer/star?artistId=${m.artistId}`} title={m.name} >{m.artistName}</Link></li>
                            })}
                        </ul>
                        <p>Written by: </p>
                        <ul>
                            {movie.casts.filter(c=> c.castTypeId === 3).map(m=> {
                                return <li key={`director-link-${m.artistId}`}><Link className="star" to={`/rewer/star?artistId=${m.artistId}`} title={m.name} >{m.artistName}</Link><br/></li>
                            })} 
                        </ul>                                      
                </div>
                           
            </div>
            <Trailer url={movie.trailer} />        
        </Load>
    )
}
export default MovieInfo;
