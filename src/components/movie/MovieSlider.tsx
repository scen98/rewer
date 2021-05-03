/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { Link } from "react-router-dom"
import "./movieStyle.css";
import EntryDiv from './EntryDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { IDetailedMovie } from '../../../common/movie';

interface IMovieSlider{
    movies: IDetailedMovie[];
    onHover: (movie: IDetailedMovie) => void;
    selectedMovie: IDetailedMovie;
}

export const MovieSlider: React.FC<IMovieSlider> = ({movies, onHover, selectedMovie}: IMovieSlider) => {
    const nextBtn = useRef<HTMLButtonElement>();
    const prevBtn = useRef<HTMLButtonElement>();
    const [getMovies, setMovies] = useState(movies.slice(0, 3));
    const [pageIndex, setPageIndex] = useState(0);
    useEffect(()=>{
        setMovies(movies.slice(0, 3));
        if(movies.length <= 3){
            nextBtn.current.style.visibility = "hidden";
            prevBtn.current.style.visibility = "hidden";
        } else {
            nextBtn.current.style.visibility = "visible";
            prevBtn.current.style.visibility = "visible";
        }
    }, [movies]);

    useEffect(()=>{
        setMovies(movies.slice(pageIndex * 3, (pageIndex * 3)+3));
    }, [pageIndex]);

    function next(){
        if((pageIndex+1) * 3 >= movies.length){
            setPageIndex(0);
        } else {
            setPageIndex(old => { return old + 1} );
        }
    }

    function prev(){
        if((pageIndex-1) < 0 ){
            setPageIndex(Math.ceil(movies.length / 3)-1);
        } else {
            setPageIndex(old => { return old - 1} );
        }
    }
    return (
        <Fragment>
        <div className="slide-grid">
            <div className="slide-div">
                <button ref={nextBtn} className="slide-btn" onClick={prev}><FontAwesomeIcon className="slide-left" icon={faChevronLeft} /></button>
            </div>
            <div className="movie-grid">
                {getMovies.map(m=>{
                    return <Link onMouseEnter={()=>{onHover(m)}} key={`latest-${m.id}`} to={`/rewer/movie?movieId=${m.id}`} className="movie-anchor" ><EntryDiv movie={m} isSelected={selectedMovie.id === m.id} /></Link>
                })}
            </div>
            <div className="slide-div">
                <button ref={prevBtn} className="slide-btn" onClick={next}><FontAwesomeIcon className="slide-right" icon={faChevronRight} /></button> 
            </div>           
        </div>
        </Fragment>
    )
}

export default MovieSlider;