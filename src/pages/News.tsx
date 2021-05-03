import React, { Fragment, useEffect, useState } from 'react'
import { IArticle } from '../../common/article';
import { articlePath } from '../callers/articleCaller';
import { usePOST } from '../callers/caller';
import ArticleRowList from '../components/article/ArticleRowList';
import FeaturedGameSides from '../components/game/FeaturedGameSides';
import ListLoad from '../components/ListLoad';
import FeaturedSides from '../components/movie/FeaturedSides';
import GenreSide from '../components/movie/GenreSide';
import TopRatedSides from '../components/movie/TopRatedSides';
import FeaturedSeriesSides from '../components/series/FeaturedSeriesSides';
import { useAsyncReference, useScroll } from '../hooks'

export default function News() {
    const [mainMsg, setMainMsg] = useState("");
    const [news, setNews] = useAsyncReference([]);
    const [newsCaller, signal] = usePOST();
    const [addScroll, removeScroll] = useScroll(0.9, getMoreNews);
    const articlePerPage = 15;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getNews();
        document.title = "News - Rewer";
        return ()=>{
            signal.abort();
            removeScroll();
        }
    }, []);

    async function getNews(){
        const articles: IArticle[]  = await newsCaller({ limit: articlePerPage, offset: 0 }, articlePath.selectLatestArticles);
        if(articles){
            setNews(articles);
            if(articles.length === articlePerPage) addScroll();
        } else {
            setMainMsg("Server error: could not downlaod news data.");
        }
        setIsLoading(false);
    }

    async function getMoreNews(){
        setIsLoading(true);
        removeScroll();
        const articles: IArticle[] = await newsCaller({ limit: articlePerPage, offset: news.current.length }, articlePath.selectLatestArticles);
        if(articles){
            setNews([ ...news.current, ...articles ]);
            if(articles.length === articlePerPage) addScroll();
        }
        setIsLoading(false);
    }
    return (
        <Fragment>
            {(window.screen.width > 800)?
            (<div className="main-grid">
                <div className="left-item">
                    <div className="side-container medium-side" >
                        <FeaturedSeriesSides/>  
                    </div>
                    <div className="side-container medium-side" >
                        <FeaturedGameSides /> 
                    </div>
                </div>
                <div className="main-item">
                    <p>{mainMsg}</p>
                    <ArticleRowList articles={news.current} cutPos={200} />
                    <ListLoad text={mainMsg} isLoading={isLoading} />
                </div>
                <div className="right-item">
                    <div className="side-container medium-side">
                        <FeaturedSides />                                             
                    </div>         
                    <div className="side-container medium-side">     
                        <TopRatedSides />
                    </div>               
                </div>
            </div>):
            (<div className="main">
                <ArticleRowList articles={news.current} cutPos={150} />
                <ListLoad text={mainMsg} isLoading={isLoading} />
            </div>)}
        </Fragment>
    )
}
