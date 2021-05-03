/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { IGenre } from '../../../common/genre';
import { IDetailedMovie } from '../../../common/movie';
import { useGET, usePOST } from '../../callers/caller';
import { moviePath } from "../../callers/movieCaller";
import { GenreSelect } from './GenreSelect';
import { MovieRowList } from './MovieRowList';

interface IGenreSide{
    length: number;
}

export const GenreSide: React.FC<IGenreSide> = ({length}: IGenreSide) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({ id: 0, name: ""} );
    const [movies, setMovies] = useState([]);
    const [genreCaller, genreSignal] = useGET(moviePath.getGenres);
    const [movieCaller, movieSignal] = usePOST({ genreId: selectedGenre.id, limit: length, offset: 0 }, moviePath.selectLatestMoviesByGenre);

    useEffect(()=>{
        requestGenres();
        return ()=>{
            movieSignal.abort();
            genreSignal.abort();
        }
    }, []);

    async function requestGenres(){
        const allGenres: IGenre[] = await genreCaller();
        if(allGenres){
            setGenres(allGenres);
        }
    }

    async function requestMovies(){
        const movies: IDetailedMovie[] = await movieCaller()
        if(movies){
            setMovies(movies);
        }
    }

    useEffect(()=>{
        if(genres.length > 0){
            setSelectedGenre(genres[Math.floor(Math.random()*genres.length)]);
        }
    }, [genres]);

    useEffect(()=>{
        if(selectedGenre.id > 0){
            requestMovies();
        }
    }, [selectedGenre]);

    return (
        <div>
            <h3 className="center-text">Fresh of 
                <GenreSelect selectedGenre={selectedGenre} genres={genres} setSelectedGenre={(g)=> { setSelectedGenre(g) }} />
            </h3>
            <MovieRowList movies={movies.map(m=> { return {...m, summary: ""} })} />
        </div>
    )
}

export default GenreSide;