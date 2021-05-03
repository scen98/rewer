/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import MainScore from '../movie/MainScore'
import "../movie/movieStyle.css"
import { Link } from "react-router-dom"
import { normalFormat } from '../../dateParser'
import { ISeries } from '../../../common/series'
import { getAvgRuntime, getAvgSeriesScore, getEpisodeCount, getFirstEpisodeDate, getSeasonCount } from '../../callers/seriesCaller'
import { useImage } from '../../hooks'
import Trailer from '../movie/Trailer'
import { ELoaderStatus, ILoader, Load } from '../Load'

interface ISeriesInfo{
    series: ISeries;
    defaultName?: string;
}

export const SeriesInfo: React.FC<ISeriesInfo> = ({series, defaultName}: ISeriesInfo) => {
    const [avgScore, setAvgScore] = useState(0);
    const [imgsrc, onImgError] = useImage("/rewer/uploads/seriesposters", `${series.id}.jpg`);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        if(series.seasons.length > 0 && getEpisodeCount(series) > 0){
            setAvgScore(getAvgSeriesScore(series));
        }
    }, [series]);

    useEffect(()=>{
        if(series.title !== defaultName){
            setLoader({ status: ELoaderStatus.Loaded });
        }
    }, [series.title]);

    return (
            <Load loader={loader}>
                {parseInt(localStorage.getItem("permission")) > 1 ? 
                (<div><Link to={`/rewer/editseries?seriesId=${series.id}`}>Edit series' page</Link></div>):
                (<Fragment></Fragment>)}
                {window.screen.width > 800 ?
                (<div className="title-grid">
                    <p className="title">{series.title}</p>
                    <MainScore value={Math.round(avgScore * 10) / 10} />
                </div>):
                (<div className="poster-grid">                
                <div>
                    <MainScore value={Math.round(avgScore * 10) / 10} />
                    <p className="title">{series.title}</p>
                    {(series.genres != null)?
                    (series.genres.map(g=> {
                        return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                    })):
                    (<Fragment></Fragment>)}    
                    </div>
                    <img src={imgsrc} onError={onImgError} className="poster" title={series.title} alt={`${series.title}-poster`} />
                </div>)}
                <div>
                    <div>
                        {window.screen.width > 1000 ?
                        <img src={imgsrc} onError={onImgError} className="floating-poster" title={series.title} alt={`${series.title}-poster`} /> :
                        <Fragment></Fragment>}
                        {window.screen.width > 800 ?
                        (<Fragment>
                            {series.genres.map(g=>{
                                return <Link key={`genre-${g.id}`} className="genre" to={"todo"}>{g.genreName}</Link>
                            })}
                        </Fragment>
                        ):
                        (<Fragment></Fragment>)}
                        <p>{series.summary}</p>
                        {(getFirstEpisodeDate(series) != null)?
                        (<Fragment>
                            <p>Premier: {normalFormat(getFirstEpisodeDate(series))}</p>
                            <p>Average runtime: {Math.round(getAvgRuntime(series))} minutes</p>
                            </Fragment>):
                        (<Fragment></Fragment>)}
                        <p>{getSeasonCount(series)} seasons</p>
                        <p>{getEpisodeCount(series)} episodes</p>
                    </div>
                    
                </div>
                <Trailer url={series.trailer} />
            </Load>
    )
}

export default SeriesInfo;