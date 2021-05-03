import React, { Fragment, useEffect } from 'react'
import FollowedReviews from '../components/review/FollowedReviews'
import FollowedUsers from '../components/profile/FollowedUsers'
import TopRatedSides from '../components/movie/TopRatedSides';
import FeaturedSides from '../components/movie/FeaturedSides';
import FollowingUsers from '../components/profile/FollowingUsers';
export default function FollowsPage() {
    useEffect(()=>{
        document.title = "Follows - Rewer";
    }, []);
    return (
        <Fragment>
            {window.screen.width > 1100 ?
            (<div className="main-grid">
                <div className="left-item">
                    <div className="side-container medium-side" >  
                        <FollowedUsers />
                    </div>
                    <div className="side-container medium-side" >
                        <TopRatedSides />                 
                    </div>  
                </div>
                <div className="main-item">
                    <FollowedReviews />
                </div>
                <div className="right-item">
                    <div className="side-container medium-side">     
                        <FollowingUsers length={10} />                                    
                    </div>
                    <div className="side-container medium-side">    
                        <FeaturedSides />     
                    </div>                     
                </div>
             </div>):
            (<div className="main-container">
                <FollowedReviews />
            </div>)}
        </Fragment>
    )
}