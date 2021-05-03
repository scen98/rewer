/* eslint-disable react-hooks/exhaustive-deps */
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { IDetailedGame, IGame } from '../../../common/game'
import EntryDiv, { EntryDivType } from '../movie/EntryDiv';
import { Link } from "react-router-dom"

interface IGameSliderM{
    games: IDetailedGame[];
    onClick: (game: IDetailedGame)=>void;
    selectedGame: IGame;
}

export const GameSliderM: React.FC<IGameSliderM> =({games, onClick, selectedGame}: IGameSliderM)=>{
    const nextBtn = useRef<HTMLButtonElement>();
    const prevBtn = useRef<HTMLButtonElement>();
    const [getMovies, setMovies] = useState(games.slice(0, 2));
    const [pageIndex, setPageIndex] = useState(0);
    
    useEffect(()=>{
        setMovies(games.slice(0, 2));
        if(games.length <= 2){
            nextBtn.current.style.visibility = "hidden";
            prevBtn.current.style.visibility = "hidden";
        } else {
            nextBtn.current.style.visibility = "visible";
            prevBtn.current.style.visibility = "visible";
        }
    }, [games]);

    useEffect(()=>{
        setMovies(games.slice(pageIndex * 2, (pageIndex * 2)+2));
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
            setPageIndex(Math.ceil(games.length / 2)-2);
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
            <div className="movie-grid movie-grid-mobile">
                {getMovies.map(m=>{
                    return <div onClick={()=>{onClick(m)}} key={`latest-${m.id}`} className="movie-anchor" ><EntryDiv movie={m} isSelected={selectedGame.id === m.id} isMobile={true} type={EntryDivType.Game} /></div>
                })}
            </div>
            <div className="slide-div">
                <button ref={prevBtn} className="slide-btn" onClick={next}><FontAwesomeIcon className="slide-right" icon={faChevronRight} /></button> 
            </div>           
        </div>
    </Fragment>
    )
}