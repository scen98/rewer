/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { IDetailedMovie } from '../../../common/movie';
import { Score } from '../movie/Score'

interface ISideEpisodeRow{
    episode: IDetailedMovie;
    selectedId: number;
}

export const SideEpisodeRow: React.FC<ISideEpisodeRow> = ({episode, selectedId}: ISideEpisodeRow) => {
    const [mainClass, setMainClass] = useState("side-row");
    useEffect(()=>{
        if(selectedId === episode.id){
            setMainClass("side-row selected-row");
        } else {
            setMainClass("side-row");
        }
    }, [selectedId]);
    return (
        <div className={mainClass}>
            <p>{episode.title}</p>
            <Score value={episode.avgScore} />
        </div>
    )
}

export default SideEpisodeRow;
