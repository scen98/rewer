/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react'
import { MovieRowList } from './MovieRowList';
import { MovieSlider } from './MovieSlider'
import { Link } from "react-router-dom"
import { normalFormat } from '../../dateParser';
import { moviePath} from '../../callers/movieCaller';
import { IDetailedMovie } from '../../../common/movie';
import { usePOST } from '../../callers/caller';
import { ICast } from '../../../common/cast';
import { ELoaderStatus, ILoader, Load } from '../Load';

export default function UpComingMovies() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState<IDetailedMovie>({id: 0, title: "", summary: "", casts: [], genres: [], releaseDate: ""});
    const [movieCaller, signal] = usePOST(moviePath.selectUpcomingMovies);
    const [directors, setDirectors] = useState<ICast[]>([]);
    const [starring, setStarring] = useState<ICast[]>([]);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        requestMovies();
        return ()=>{
            signal.abort();
        }
    }, []);
    async function requestMovies(){
        const upcoming = await movieCaller({ limit: 3, offset: 0 }, moviePath.selectUpcomingMovies);
        if(upcoming){
            setMovies(upcoming);
            setSelectedMovie(upcoming[0]);
            setLoader({ status: ELoaderStatus.Loaded });
        } else {
            setLoader({ status: ELoaderStatus.Error, text: "Server error: could not retrieve data." });
        }
    }

    useEffect(()=>{
        if(selectedMovie == null || selectedMovie.casts == null){
            setDirectors([]);
            setStarring([]);
        } else {
            setDirectors(selectedMovie.casts.filter(c=> c.castTypeId === 1));
            setStarring(selectedMovie.casts.filter(c=>c.castTypeId > 3).slice(0, 5)); //only display the first 5
        }
    }, [selectedMovie]);

    return (
        <Load loader={loader}>
            {window.screen.width > 600 ?            
            (<div className="highlight-grid">
                <MovieSlider movies={movies} onHover={(movie: IDetailedMovie)=> { setSelectedMovie(movie) }} selectedMovie={selectedMovie} />
                <div className="highlighted-movie fade">
                    <h3>{selectedMovie.title}</h3>
                    <p className="highlight-text">{selectedMovie.summary}</p>
                    <p>
                    <span>Directed by: </span>
                    {directors.map(d=>{
                        return <Link key={`upcoming-${d.artistId}`} to={`/rewer/star?artistId=${d.artistId}`}>
                            {d.artistName}
                            {(d.id !== directors[directors.length-1].id) ?
                            (<span>, </span>): 
                            (<Fragment></Fragment>)} {/*puts comma between list elements */}
                        </Link>                            
                    })}    
                    </p>
                    <p>
                    <span>Starring: </span> 
                    {starring.map(d=>{
                        return <Link key={`upcoming-${d.artistId}`} to={`/rewer/star?artistId=${d.artistId}`}>
                            {d.artistName}
                            {(d.id !== starring[starring.length-1].id) ?
                            (<span>, </span>):
                            (<Fragment></Fragment>)}
                        </Link>
                    })}                        
                    </p>
                    <p>Coming: <b>{normalFormat(selectedMovie.releaseDate)}</b></p>
                </div>
            </div>            
            ) :
            (<MovieRowList movies={movies} />)
            }
        </Load>
    )
}
