/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { IGenre } from '../../../common/genre';

interface IGenreSelect{
    selectedGenre: IGenre;
    setSelectedGenre: (g: IGenre) => void;
    genres: IGenre[];
    any?: boolean;
}

export const GenreSelect: React.FC<IGenreSelect> = ({genres, setSelectedGenre, selectedGenre, any}: IGenreSelect)=> {
    const [getGenres, setGenres] = useState([]);
    useEffect(()=>{
        if(any){
            setGenres([{ id: 0, name: "Any" }, ...genres]);
        } else {
            setGenres(genres);
        }
    }, [genres]);
    return (
        <select value={selectedGenre.id.toString()} onChange={(e)=> { setSelectedGenre(getGenres.find(g=> g.id === parseInt(e.target.value))) }} >
            {getGenres.map(g=> {
                return <option key={`opt${g.id}`} value={g.id}>{g.name}</option>
            })}
        </select>
    )
}
