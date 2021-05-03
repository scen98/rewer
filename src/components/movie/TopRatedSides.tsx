/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment} from 'react'
import { IDetailedMovie, WSelectMoviesByScoreRequest } from '../../../common/movie';
import { usePOST } from '../../callers/caller';
import { moviePath } from '../../callers/movieCaller';
import { ELoaderStatus, ILoader, Load } from '../Load';
import { MovieRow } from './MovieRow'

export default function TopRatedSides() {
    const[topRateds, setTopRateds] = useState([]);
    const request: WSelectMoviesByScoreRequest = {
        min: 7,
        limit: 4,
        offset: 0
    }
    const [callTopRated, signal] = usePOST(request, moviePath.selectMoviesByScore);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{        
        getTopRateds();
        return ()=>{
            signal.abort();
        }
    }, []);

    async function getTopRateds(){
        const tops: IDetailedMovie[] = await callTopRated();
        if(tops){
            setTopRateds(tops);
            setLoader({ status: ELoaderStatus.Loaded });
        } else {
            setLoader({ status: ELoaderStatus.Error, text: "Server error: could not download data." });
        }
    }

    return (
        <Load loader={loader}>
             <h3 className="center-text">Top Rated</h3>      
                    {topRateds.map(t=>{
                        return <MovieRow key={`top-rated-${t.id}`} movie={{...t, summary: ""}} />
                    })} 
        </Load>
    )
}
