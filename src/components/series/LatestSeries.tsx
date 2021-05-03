/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import SeriesSlider from './SeriesSlider';
import {Link} from "react-router-dom"
import SeriesRow from './SeriesRow';
import { seriesPath } from '../../callers/seriesCaller';
import { IPreviewSeries } from '../../../common/series';
import { usePOST } from '../../callers/caller';
import { ELoaderStatus, ILoader, Load } from '../Load';

export default function LatestSeries() {
    const [series, setSeries] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState<IPreviewSeries>({id: 0, title: "", summary: "", lastEpisodeId: 0, lastEpisodeTitle: "", avgScore: 0 });
    const [seriesCaller, signal] = usePOST({ limit: 9 },seriesPath.selectLatestPreviewSeries);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        async function getSeries(){
            const latestSeries: IPreviewSeries[] = await seriesCaller();
            if(latestSeries){
                setSeries(latestSeries.slice(0, 3));
                setSelectedSeries(latestSeries[0]);
                setLoader({ status: ELoaderStatus.Loaded });
            } else {
                setLoader({ status: ELoaderStatus.Error, text: "Server error: could not download data."});
            }
         }
        getSeries();             
        return ()=>{
            signal.abort();
        }
    }, []);
    
    return (
        <Load loader={loader}>
            {window.screen.width > 800 ?
            (<div className="highlight-grid">
                <SeriesSlider series={series} onHover={(s: IPreviewSeries)=> { setSelectedSeries(s) }} selectedSeries={selectedSeries} />
                <div className="highlighted-movie fade">
                    <h3>{selectedSeries.title}</h3>
                    <p className="highlight-text">{selectedSeries.summary}</p>
                    <p>Last episode: </p>
                    <Link to={`/rewer/movie?movieId=${selectedSeries.lastEpisodeId}`}>{selectedSeries.lastEpisodeTitle}</Link><br/><br/>
                </div>
            </div> ) : 
            (<Fragment>{series.map(s=> {
                return <SeriesRow key={`series-row${s.id}`} series={s} />
            })}</Fragment>)}
           
        </Load>
    )
}
