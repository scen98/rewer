/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react'
import CastList from '../components/cast/CastList';
import FeaturedSides from '../components/movie/FeaturedSides';
import GenreSide from '../components/movie/GenreSide';
import MovieInfo from '../components/movie/MovieInfo'
import { MyReview } from '../components/review/MyReview';
import { isEntryReleased, moviePath } from '../callers/movieCaller';
import { getParameter } from '../urlManager';
import { IDetailedMovie } from '../../common/movie';
import { ICast } from '../../common/cast';
import { usePOST } from '../callers/caller';
import ArticleSides from '../components/article/ArticleSides';
import EntryReviewFeed from '../components/review/EntryReviewFeed';

interface IMoviePage{

}
export default function Movie() {
    const [movie, setMovie] = useState<IDetailedMovie>({ id: parseInt(getParameter("movieId")), title: "Loading...", releaseDate: "", summary: "...", genres: [], casts: [], avgScore: 0 });
    const [actors, setActors] = useState<ICast[]>([]);
    const [movieCaller, movieSignal] = usePOST({ id: movie.id }, moviePath.selectDetailedMovie);
    
    useEffect(()=>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if(movie.id > 0) requestMovie();

        return ()=>{
            movieSignal.abort();
        }
    }, []);

    useEffect(()=>{
        if(movie != null) document.title = `${movie.title} - Rewer`;
    }, [movie])

    async function requestMovie(){
        const selectedMovie = await movieCaller();
        if(selectedMovie){
            setMovie(selectedMovie);
            setActors(selectedMovie.casts.filter((c=> c.castTypeId > 3)));
        }
    }
    
    return (
        <Fragment>
            {window.screen.width > 800 ?
            (<div className="main-grid">
                <div className="left-item">
                    {isEntryReleased(movie) ?
                    (<div className="side-container">    
                        <MyReview entry={movie} />
                    </div> ):
                    (<Fragment></Fragment>)
                    }                
                    <div className="side-container" >  
                        <FeaturedSides />
                    </div>  
                    <div className="side-container" >
                        <ArticleSides cutPos={70} length={2} />
                    </div>                 
                </div>
                <div className="main-item">
                    <MovieInfo movie={movie} defaultName={"Loading..."} />                 
                    <EntryReviewFeed entry={movie} />
                </div>
                <div className="right-item">
                    <div className="side-container">
                        <h3 className="center-text">Cast</h3> 
                        <CastList casts={actors} /> 
                    </div>         
                    <div className="side-container" >  
                        <GenreSide length={3} />
                    </div>             
                </div>
             </div>) : 
            (<div className="main-container" >
            <MovieInfo movie={movie} defaultName={"Loading..."} />
            <h2>Cast</h2>
            <CastList casts={actors} />
            {isEntryReleased(movie) ?
            (<MyReview entry={movie} />):
            (<Fragment></Fragment>)}            
            <EntryReviewFeed entry={movie} />
        </div>) }
        </Fragment>           
    )
}
