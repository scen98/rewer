/* eslint-disable react-hooks/exhaustive-deps */
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { IDetailedGame, IGame } from '../../../common/game'
import EntryDiv from '../movie/EntryDiv';
import { Link } from "react-router-dom"

interface IGameSlider{
    games: IDetailedGame[];
    onHover: (game: IDetailedGame)=>void;
    selectedGame: IGame;
}

export const GameSlider: React.FC<IGameSlider> =({games, onHover, selectedGame}: IGameSlider)=>{
    const nextBtn = useRef<HTMLButtonElement>();
    const prevBtn = useRef<HTMLButtonElement>();
    const [getMovies, setMovies] = useState(games.slice(0, 3));
    const [pageIndex, setPageIndex] = useState(0);
    
    useEffect(()=>{
        setMovies(games.slice(0, 3));
        if(games.length <= 3){
            nextBtn.current.style.visibility = "hidden";
            prevBtn.current.style.visibility = "hidden";
        } else {
            nextBtn.current.style.visibility = "visible";
            prevBtn.current.style.visibility = "visible";
        }
    }, [games]);

    useEffect(()=>{
        setMovies(games.slice(pageIndex * 3, (pageIndex * 3)+3));
    }, [pageIndex]);

    function next(){
        if((pageIndex+1) * 3 >= games.length){
            setPageIndex(0);
        } else {
            setPageIndex(old => { return old + 1} );
        }
    }

    function prev(){
        if((pageIndex-1) < 0 ){
            setPageIndex(Math.ceil(games.length / 3)-1);
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
                    return <Link onMouseEnter={()=>{onHover(m)}} key={`latest-${m.id}`} to={`/rewer/game?gameId=${m.id}`} className="movie-anchor" ><EntryDiv movie={m} isSelected={selectedGame.id === m.id} /></Link>
                })}
            </div>
            <div className="slide-div">
                <button ref={prevBtn} className="slide-btn" onClick={next}><FontAwesomeIcon className="slide-right" icon={faChevronRight} /></button> 
            </div>           
        </div>
    </Fragment>
    )
}
