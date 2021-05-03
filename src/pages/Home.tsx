/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import LatestMovies from '../components/movie/LatestMovies';
import UpComingMovies from '../components/movie/UpComingMovies';
import LoginMsg from '../components/profile/LoginMsg';
import FollowedReviews from '../components/review/FollowedReviews';
import LatestSeries from '../components/series/LatestSeries';
import "../main.css";
import Spotlight from '../components/cast/Spotlight';
import SearchSide from '../components/SearchSide';
import { ICast } from '../../common/cast';
import { usePOST } from '../callers/caller';
import { articlePath } from '../callers/articleCaller';
import { IArticle } from '../../common/article';
import ArticleRowList from '../components/article/ArticleRowList';
import { SideArticleRowList } from '../components/article/SideArticleRowList';
import LatestGames from '../components/game/LatestGames';
import LatestMoviesM from '../components/movie/LatestMoviesM';
import LatestGamesM from '../components/game/LatestGamesM';
import { ELoaderStatus, ILoader, Load } from '../components/Load';

export default function Home() {
    const [latestCasts, setLatestsCasts] = useState([]);
    const [news, setNews] = useState<IArticle[]>([]);
    const [mainCaller, signal] = usePOST({ limit: 3, offset: 0 }, articlePath.selectLatestArticles);
    const [newsLoader, setNewsLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        document.title = "Rewer";
        getNews(); 
        return ()=>{
            signal.abort();
        }
    }, []);

    async function getNews(){
        const articles = await mainCaller();
        if(articles){
            setNews(articles);
            setNewsLoader({ status: ELoaderStatus.Loaded });
        } else {
            setNewsLoader({ status: ELoaderStatus.Error, text: "Server error: could not download data." });
        }
    }

    return (
        <Fragment>
            {window.screen.width > 800 ? 
            (<div className="home-grid">
            <div className="main-item">
                <h2 className="main-title">In Theatres</h2>
                <LatestMovies onMovieUpdate={(casts: ICast[]) => { setLatestsCasts(casts); }} />
                <h2 className="main-title">Upcoming</h2>
                <UpComingMovies />
                <div className="divider" />
                <h2 className="main-title">New games</h2>
                <LatestGames />
                <div className="divider" />
                <h2 className="main-title">Shows with new episodes</h2>
                <LatestSeries />
                <div className="divider" />
                <h2 className="main-title">Follows</h2>
                {(localStorage.getItem("userName") != null) ? 
                (<FollowedReviews />):
                (<LoginMsg message={"to follow other users."} />)
                }
            </div>
            <div className="right-item">
                <div className="side-container" >
                    <SearchSide />                
                </div>
                <div className="side-container" >
                    <h2>Latest news</h2>
                    <Load loader={newsLoader}>
                        <SideArticleRowList articles={news} cutPos={150} />    
                    </Load>                           
                </div>
                <div className="side-container" >
                    <Spotlight casts={latestCasts} length={5} />                 
                </div>   
            </div>
         </div>):
            (<div className="main-container">
            <h2 className="main-title">In Theatres</h2>
            <LatestMoviesM />
            <div className="divider" />
            <h2 className="main-title">Upcoming</h2>
            <UpComingMovies />
            <div className="divider" />
            <h2 className="main-title">New games</h2>
            <LatestGamesM />
            <div className="divider" />
            <h2 className="main-title">Shows with new episodes</h2>
            <LatestSeries />
            <div className="divider" />
            <h2 className="main-title">Latest news</h2>
            <Load loader={newsLoader}>
                <ArticleRowList articles={news} cutPos={50} />
            </Load>            
            <div className="divider" />  
            <h2 className="main-title">Follows</h2>
            {(localStorage.getItem("userName") != null) ? 
            (<FollowedReviews />):
            (<LoginMsg message={"to follow other users."} />)
            }
    </div>)}
        </Fragment>
    ) 
}
