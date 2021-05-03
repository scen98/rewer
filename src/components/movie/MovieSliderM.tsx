/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from 'react'
import "./movieStyle.css";
import EntryDiv from './EntryDiv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { IDetailedMovie } from '../../../common/movie';


interface IMovieSliderM{
    movies: IDetailedMovie[];
    onClick: (movie: IDetailedMovie) => void;
    selectedMovie: IDetailedMovie;
}

export const MovieSliderM: React.FC<IMovieSliderM> = ({movies, onClick, selectedMovie}: IMovieSliderM) => {
    const nextBtn = useRef<HTMLButtonElement>();
    const prevBtn = useRef<HTMLButtonElement>();
    const [getMovies, setMovies] = useState(movies.slice(0, 2));
    const [pageIndex, setPageIndex] = useState(0);
    useEffect(()=>{
        setMovies(movies.slice(0, 2));
        if(movies.length <= 2){
            nextBtn.current.style.visibility = "hidden";
            prevBtn.current.style.visibility = "hidden";
        } else {
            nextBtn.current.style.visibility = "visible";
            prevBtn.current.style.visibility = "visible";
        }
    }, [movies]);

    useEffect(()=>{
        setMovies(movies.slice(pageIndex * 2, (pageIndex * 2)+2));
    }, [pageIndex]);

    function next(){
        if((pageIndex+1) * 2 >= movies.length){
            setPageIndex(0);
        } else {
            setPageIndex(old => { return old + 1} );
        }
    }

    function prev(){
        if((pageIndex-1) < 0 ){
            setPageIndex(Math.ceil(movies.length / 2)-1);
        } else {
            setPageIndex(old => { return old - 1} );
        }
    } //to={`/rewer/movie?movieId=${m.id}`}
    return (
        <Fragment>
        <div className="slide-grid">
            <div className="slide-div">
                <button ref={nextBtn} className="slide-btn" onClick={prev}><FontAwesomeIcon className="slide-left" icon={faChevronLeft} /></button>
            </div>
            <div className="movie-grid movie-grid-mobile">
                {getMovies.map(m=>{
                    return <div onClick={()=>{ onClick(m)} } key={`latest-${m.id}`}  className="movie-anchor" ><EntryDiv movie={m} isSelected={selectedMovie.id === m.id} isMobile={true} /></div>
                })}
            </div>
            <div className="slide-div">
                <button ref={prevBtn} className="slide-btn" onClick={next}><FontAwesomeIcon className="slide-right" icon={faChevronRight} /></button> 
            </div>           
        </div>
        </Fragment>
    )
}

export default MovieSliderM;