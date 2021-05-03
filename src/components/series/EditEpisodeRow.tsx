/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IMovie } from '../../../common/movie';
import { normalFormat } from '../../dateParser';

interface IEditEpisodeRow{
    episode: IMovie;
    selectedId: number;
    onSelect: ()=> void;
    onDelete: ()=> void;
}

export const EditEpisodeRow: React.FC<IEditEpisodeRow> = ({episode, selectedId, onSelect, onDelete}: IEditEpisodeRow) => {
    const [className, setClassName] = useState("edit-episode-row")
    useEffect(()=>{
        if(selectedId === episode.id){
            setClassName("edit-episode-row selected-row");
        } else {
            setClassName("edit-episode-row");
        }
    }, [selectedId]);
    return (
        <div onClick={onSelect} className={className}>
            <p>{episode.title}</p>
            <p>{normalFormat(episode.releaseDate.toString())}</p>
            <p><button onClick={onDelete}>Delete</button></p>
        </div>
    )
}
export default EditEpisodeRow;