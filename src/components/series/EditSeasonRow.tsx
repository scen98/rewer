/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ISeason } from '../../../common/season';
import "./seriesStyle.css"

interface IEditSeasonRow{
    season: ISeason;
    selectedId: number;
    onSelected: ()=> void;
}

export const EditSeasonRow: React.FC<IEditSeasonRow> = ({season, selectedId, onSelected}: IEditSeasonRow) => {
    const [mainClass, setMainClass] = useState("season-grid");
    useEffect(()=>{
        if(season.id === selectedId){
            setMainClass("season-grid selected-row");
        } else {
            setMainClass("season-grid");
        }
    }, [selectedId]);
    return (
        <div onClick={()=> {onSelected();}} className={mainClass}>
            <p>Season {season.order}</p>
            <p>{season.releaseYear}</p>
            <p>{season.episodes.length} episodes</p>
        </div>
    )
}

export default EditSeasonRow;
