/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { IDetailedMovie } from '../../../common/movie';
import { usePOST } from '../../callers/caller';
import { moviePath } from '../../callers/movieCaller';
import { ELoaderStatus, ILoader, Load } from '../Load';
import EntryDiv from './EntryDiv';

export default function FeaturedSides() {
    const[featuredMovies, setFeaturedMovies] = useState<IDetailedMovie[]>([]);
    const [caller, signal] = usePOST({ limit: 9 }, moviePath.selectLatestMovies);
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        getLatestFeatures();
        return ()=>{
            signal.abort();
        }
    }, []);

    async function getLatestFeatures(){
        const movies: IDetailedMovie[] = await caller();
        const rnd = Math.floor(Math.random()*5);
        if(movies) {
            setFeaturedMovies(movies.slice(rnd, rnd+2)); 
            setLoader({ status: ELoaderStatus.Loaded });
        } else {
            setLoader({ status: ELoaderStatus.Error });
        }
    }

    return (
        <Load loader={loader}>
            <h3 className="center-text">Featured Films</h3>
                    <div className="double-grid">
                        {featuredMovies.map(f=> {
                            return (<Link key={`featured-${f.id}`} to={`/rewer/movie?movieId=${f.id}`}>
                                        <EntryDiv movie={f} />
                                    </Link>)
                        })}
                    </div>  
        </Load>
    )
}
