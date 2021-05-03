import React, { useState, useEffect } from 'react'
import "../movie/movieStyle.css"
import {Link} from "react-router-dom"
import { Score } from '../movie/Score'
import { IPreviewSeries } from '../../../common/series'
import { ESize, useCutter, useImage } from '../../hooks'

interface ISeriesRow{
    series: IPreviewSeries;
}

export const SeriesRow: React.FC<ISeriesRow> = ({series}: ISeriesRow) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/seriesposters", `${series.id}.jpg`, ESize.Small);
    const [imgClass, setImgClass] = useState("");
    const [summary] = useCutter(series.summary, 70);
    useEffect(()=>{
        if(series.avgScore > 6){
            setImgClass("high-poster");
        } else if(series.avgScore > 3){
            setImgClass("medium-poster");
        } else if(series.avgScore > 0) {
            setImgClass("low-poster");
        } else {
            setImgClass("");
        }
    }, [series])
    return (
        <div className="movie-row-grid">
            <Link to={`/rewer/series?seriesId=${series.id}`}>
                <img className={imgClass} src={imgsrc} alt={`poster-${series.id}`} title={series.title} onError={onImgError} />
            </Link>
            <div>
                <p className="row-title">{series.title}:</p>
                <p className="summary">{summary}</p>
            </div>        
            <Score value={series.avgScore} />
        </div>
    )
}

export default SeriesRow;