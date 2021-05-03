/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { GenreSelect } from './GenreSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { compareGenresByName, moviePath } from '../../callers/movieCaller';
import { IGenre } from '../../../common/genre';
import { useGET } from '../../callers/caller';
import { gamePath } from '../../callers/gameCaller';

export enum EGenreType{
    Movie,
    Game
}

interface IGenreAdder{
    movie: any;
    onAdd: (genre: IGenre) => void;
    onDelete: (id: number) => void;
    genreType?: EGenreType;
}
export const GenreAdder: React.FC<IGenreAdder> = ({movie, onAdd, onDelete, genreType = EGenreType.Movie}: IGenreAdder)=> {
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState<IGenre>({id: 0, name: ""});
    const [genreCaller, signal] = useGET();
    useEffect(()=>{
        requestGenres();
        return ()=>{
            signal.abort();
        }
    },[]);

    async function requestGenres(){
        const path = genreType === EGenreType.Movie ? moviePath.getGenres : gamePath.getGenres;
        const genres = await genreCaller(path);
        if(genres != null){
            genres.sort(compareGenresByName);
            setGenreList(genres);
        }
    }

    function addGenre(){
        if(selectedGenre.id > 0){
            onAdd(selectedGenre);
        } else {
            onAdd(genreList[0]);
        }
    }

    return (
        <div>
            <h3>Genres:</h3>
            <div className= "edit-genre-container">
            {movie.genres.map(g=> {
                return <div key={`genre-${g.id}`} className="edit-genre"><span>{g.genreName}</span><button onClick={()=> { onDelete(g.id); }} ><FontAwesomeIcon icon={faTimes} /></button></div>
            })}
            </div>
            <div className="adder-panel">
                <GenreSelect genres={genreList} selectedGenre={selectedGenre} setSelectedGenre={(g: IGenre)=> { setSelectedGenre(g) }} />
                <button onClick={()=>{ addGenre() }}><FontAwesomeIcon icon={faPlus} />Add</button><br/>
            </div>      
        </div>
    )
}
export default GenreAdder;