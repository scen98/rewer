import React from 'react'
import { IMovie } from '../../../common/movie'
import { MovieRow } from './MovieRow'

interface IMovieRowList{
    movies: IMovie[];
}

export const MovieRowList: React.FC<IMovieRowList> = ({movies}: IMovieRowList) => {
    return (
        <div>
            {movies.map(m=>{
                return <MovieRow key={`movie-row-${m.id}`} movie={m} />
            })}
        </div>
    )
}
