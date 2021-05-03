/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react'
import { IDetailedArtist } from '../../common/artist';
import { artistPath } from '../callers/artistCaller';
import { usePOST } from '../callers/caller';
import { StarInfo } from '../components/artist/StarInfo';
import ArtistCastList from '../components/cast/ArtistCastList';
import ArtistSeriesCastList from '../components/cast/ArtistSeriesCastList';
import FeaturedSides from '../components/movie/FeaturedSides';
import GenreSide from '../components/movie/GenreSide';
import TopRatedSides from '../components/movie/TopRatedSides';
import SearchSide from '../components/SearchSide';
import FeaturedSeriesSides from '../components/series/FeaturedSeriesSides';
import { getParameter } from '../urlManager';

export default function Star() {
    const [artist, setArtist] = useState<IDetailedArtist>({id: parseInt(getParameter("artistId")), name: "", birthPlace: "", birthDate: "", deathPlace: "", deathDate: "", bio: "", entryCasts: [], seriesCasts: []});
    const [artistCaller, signal] = usePOST({ id: artist.id }, artistPath.selectDetailedArtist);
    
    useEffect(()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        async function requestArtist(){
            const detailedArtist: IDetailedArtist = await artistCaller();
            console.log(detailedArtist);
            if(detailedArtist){
                setArtist(detailedArtist);
            } else {
                alert("Server error.");
            }
        }
        requestArtist();
        return ()=>{
            signal.abort();
        }
    }, []);
    
    useEffect(()=>{
        if(artist) document.title = `${artist.name} - Rewer`;
    }, [artist]);

    return (
        <Fragment>
            {window.screen.width > 1100 ?
            (<div className="main-grid">
                <div className="left-item">
                    <div className="side-container large-side">
                       {Math.random() > 0.5 ?
                       (<FeaturedSides />):                        
                       (<FeaturedSeriesSides />)}
                    </div>
                    <div className="side-container medium-side">
                        <GenreSide length={5} />
                    </div>
                </div>
                <div className="main-item">
                    <StarInfo artist={artist} />
                    <ArtistCastList casts={artist.entryCasts} />
                    <ArtistSeriesCastList casts={artist.seriesCasts} />
                </div>
                <div className="right-item">
                    <div className="side-container medium-side">
                        <SearchSide />
                    </div>
                    <div className="side-container medium-side">
                        <TopRatedSides />
                    </div>
                </div>
            </div>):
            (<div className="main-container">
                <StarInfo artist={artist} />
                <ArtistCastList casts={artist.entryCasts} />
                <ArtistSeriesCastList casts={artist.seriesCasts} />
            </div>)    
        } 
        </Fragment>
        
    )
}
