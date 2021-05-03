/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import "../movie/movieStyle.css"
import SeriesDiv from './SeriesDiv'
import { IPreviewSeries } from '../../../common/series'

interface ISeriesSlider{ 
    series: IPreviewSeries[];
    onHover: (series: IPreviewSeries) => void;
    selectedSeries: IPreviewSeries;
}

export const SeriesSlider: React.FC<ISeriesSlider> = ({series, onHover, selectedSeries}: ISeriesSlider) => {
    const nextBtn = useRef<HTMLButtonElement>();
    const prevBtn = useRef<HTMLButtonElement>();
    const [getSeries, setSeries] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    useEffect(()=>{
        setSeries(series.slice(0, 3));
        if(series.length <= 3){
            nextBtn.current.style.visibility = "hidden";
            prevBtn.current.style.visibility = "hidden";
        } else {
            nextBtn.current.style.visibility = "visible";
            prevBtn.current.style.visibility = "visible";
        }
    }, [series]);

    useEffect(()=>{
        setSeries(series.slice(pageIndex * 3, (pageIndex * 3)+3));
    }, [pageIndex])

    function next(){
        if((pageIndex+1) * 3 >= series.length){
            setPageIndex(0);
        } else {
            setPageIndex(old => { return old + 1} );
        }
    }

    function prev(){
        if((pageIndex-1) < 0 ){
            setPageIndex(Math.ceil(series.length / 3)-1);
        } else {
            setPageIndex(old => { return old - 1} );
        }
    }
    return (
        <Fragment>
        <div className="slide-grid">
            <button ref={nextBtn} className="slide-btn" onClick={prev}><FontAwesomeIcon icon={faBackward} /></button>
            <div className="movie-grid">
                {getSeries.map(s=>{
                    return <Link key={`series-${s.id}`} onMouseEnter={()=> { onHover(s) }} className="movie-anchor"  to={`/rewer/series?seriesId=${s.id}`}><SeriesDiv series={s} isSelected={selectedSeries.id === s.id} /></Link>
                })}
            </div>
            <button ref={prevBtn} className="slide-btn" onClick={next}><FontAwesomeIcon icon={faForward} /></button> 
        </div>
        </Fragment>
    )
}

export default SeriesSlider;