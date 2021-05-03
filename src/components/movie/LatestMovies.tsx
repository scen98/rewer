/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react'
import { MovieRowList } from './MovieRowList';
import MovieSlider from './MovieSlider'
import { Link } from "react-router-dom"
import "./movieStyle.css"
import { moviePath } from '../../callers/movieCaller';
import { IDetailedMovie } from '../../../common/movie';
import { ICast } from '../../../common/cast';
import { usePOST } from '../../callers/caller';
import { ELoaderStatus, ILoader, Load } from '../Load';

interface ILatestMovies{
    onMovieUpdate?: (movies: ICast[]) => void;
}

export const LatestMovies: React.FC<ILatestMovies> = ({onMovieUpdate}: ILatestMovies) => {
    const [movies, setMovies] = useState<IDetailedMovie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<IDetailedMovie>({id: 0, title: "", summary: "", casts: [], genres: [], releaseDate: ""});
    const [movieCaller, signal] = usePOST({ limit: 9 }, moviePath.selectLatestMovies);
    const [directors, setDirectors] = useState<ICast[]>([]);
    const [starring, setStarring] = useState<ICast[]>([]);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        async function requestMovies(){
            const latests: IDetailedMovie[] = await movieCaller();
            if(latests){
                setMovies(latests.slice(0, 9));
                setSelectedMovie(latests[0]);
                setLoader({ status: ELoaderStatus.Loaded});
            } else {
                setLoader({ status: ELoaderStatus.Error, text: "Server error: could not download data." });
            }
        }
        requestMovies();
        return ()=>{
            signal.abort();
        }
    }, []);

    useEffect(()=>{
        if(onMovieUpdate){    
            onMovieUpdate(getAllCasts());
        }
    }, [movies]);

    useEffect(()=>{
        if(selectedMovie == null || selectedMovie.casts == null) {
            setDirectors([]);
            setStarring([]);
        } else {
            setDirectors(selectedMovie.casts.filter(c=> c.castTypeId === 1));
            setStarring(selectedMovie.casts.filter(c=> c.castTypeId > 3).slice(0, 5));
        }
    }, [selectedMovie]);

    function getAllCasts(): ICast[]{
        return movies.flatMap(m=> m.casts);
    }

    return (
        <Load loader={loader}>
            {true ? 
            (<Fragment>
                <div className="highlight-grid">
                    <MovieSlider movies={movies} onHover={(movie: IDetailedMovie)=> { setSelectedMovie(movie) }} selectedMovie={selectedMovie} />
                    <div className="highlighted-movie fade">
                        <h3>{selectedMovie.title}</h3>
                        <p className="highlight-text">{selectedMovie.summary}</p>
                        <p><span>Directed by: </span>
                        {directors.filter(c=> c.castTypeId === 1).map(d=>{
                            return <Link key={`latest-${d.artistId}`} to={`/rewer/star?artistId=${d.artistId}`}>
                            {d.artistName}
                            {(d.id !== directors[directors.length-1].id) ?
                            (<span>, </span>):
                            (<Fragment></Fragment>)}
                            </Link>                                   
                        })}
                        </p>
                        <p>                                                
                        <span>Starring: </span>
                        {starring.map(d=>{
                            return <Link key={`latest-${d.artistId}`} to={`/rewer/star?artistId=${d.artistId}`}>
                            {d.artistName}
                            {(d.id !== starring[starring.length-1].id) ?
                            (<span>, </span>):
                            (<Fragment></Fragment>)}
                            </Link>
                        })}
                        </p> 
                    </div>
                </div> 
            </Fragment>) :
            (<MovieRowList movies={movies} />)
            }       
        </Load>
    )
}

export default LatestMovies;