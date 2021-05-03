/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect } from 'react'
import { IPreviewSeries } from '../../../common/series';
import { useImage, useRatio } from '../../hooks';
import "../movie/movieStyle.css";

interface ISeriesDiv{
    series: IPreviewSeries;
    isSelected?: boolean;
}

export const SeriesDiv: React.FC<ISeriesDiv> = ({series, isSelected = false}: ISeriesDiv) => {
    const [mainClass, setMainClass] = useState("movie-container fade");
    const [imgsrc, onImgError] = useImage("/rewer/uploads/seriesposters", `${series.id}.jpg`);
    const [imgClass, setImgClass] = useState("");
    const [scoreClass, setScoreClass] = useState("");
    const scoreLine = useRef<HTMLDivElement>();
    const [img, listenImg, cleanUpImgListener] = useRatio<HTMLImageElement>(1.47);

    useEffect(()=>{
        listenImg();
        return()=>{
            cleanUpImgListener();
        }
    }, []);

    useEffect(()=>{
        if(isSelected){
            setMainClass("movie-container fade selected-container")
        } else {
            setMainClass("movie-container fade")
        }
    }, [isSelected]);

    useEffect(()=>{
        if(series.avgScore > 6){
            setImgClass("high-poster");
            setScoreClass("high");
            scoreLine.current.style.display = "block";
        } else if(series.avgScore > 3){
            setImgClass("medium-poster");
            setScoreClass("medium");
            scoreLine.current.style.display = "block";
        } else if(series.avgScore > 0){
            setImgClass("low-poster");
            setScoreClass("low");
            scoreLine.current.style.display = "block";
        } else {
            scoreLine.current.style.display = "none";
        }
    }, [series]);
    
    return (
        <div className={mainClass}>            
            <img ref={img} className={imgClass} src={imgsrc} alt={`${series.title}-poster`} onError={onImgError} />
            <div ref={scoreLine} className={scoreClass} >
                <span className="score-line">{ Math.round(series.avgScore * 10)/10}</span>
            </div>
            <p className="movie-title">{series.title}</p>
        </div>
    )
}
export default SeriesDiv;