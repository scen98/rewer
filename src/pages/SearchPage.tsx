import React, { Fragment, useEffect } from 'react'
import FeaturedSides from '../components/movie/FeaturedSides';
import Search from '../components/Search';
import FeaturedSeriesSides from '../components/series/FeaturedSeriesSides';

export default function SearchPage() {
    useEffect(()=>{
        document.title = "Search - Rewer";
    }, []);
    return (
        <Fragment>
            {window.screen.width > 1000 ?
            (<div className="main-grid">
                <div className="left-item">
                    <div className="side-container medium-side">
                        <FeaturedSeriesSides />
                    </div>
                </div>
                <div className="main-item">
                    <Search />
                </div>
                <div className="right-item ">
                    <div className="side-container medium-side">
                        <FeaturedSides />
                    </div>
                </div>
            </div>):
            (<div className="main-container">
                <Search />
            </div>)}
        </Fragment>    
    )
}