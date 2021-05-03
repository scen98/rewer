/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { IPreviewSeries } from '../../../common/series';
import { usePOST } from '../../callers/caller';
import { seriesPath } from '../../callers/seriesCaller';
import { ELoaderStatus, ILoader, Load } from '../Load';
import SeriesDiv from './SeriesDiv';

interface IFeaturedSeriesSides{
   // series: ISeries[];
}

export const FeaturedSeriesSides: React.FC<IFeaturedSeriesSides> = () => {
    const [featueredSeries, setFeaturedSeries] = useState([]);
    const [seriesCaller, signal] = usePOST({ limit: 9}, seriesPath.selectLatestPreviewSeries);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading })

    useEffect(()=>{
        requestFeaturedSeries();
        return ()=>{
            signal.abort();
        }
    }, []);

    async function requestFeaturedSeries(){
        const featured: IPreviewSeries[] = await seriesCaller();
        if(featured){
            setFeaturedSeries(featured.slice(0, 2)); //majd random lesz elég adattal
            setLoader({ status: ELoaderStatus.Loaded });
        } else {
            setLoader({ status: ELoaderStatus.Error, text: "Server error: could not download data." });
        }
    }

    return (
        <Load loader={loader}>
            <h3 className="center-text">Featured Series</h3>
                <div className="double-grid">
                    {featueredSeries.map(f=> {
                        return (<Link key={`featured-${f.id}`} to={`/rewer/series?seriesId=${f.id}`}>
                                    <SeriesDiv series={f} />
                                </Link>)
                    })}
                </div>  
        </Load>
    )
}
export default FeaturedSeriesSides;