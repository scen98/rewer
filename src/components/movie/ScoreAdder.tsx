/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react'
import "./movieStyle.css"
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Score } from './Score'
interface IScoreAdder{
    startValue: number;
    setScore: (newValue: number)=> void;
}

export const ScoreAdder: React.FC<IScoreAdder> = ({startValue, setScore}: IScoreAdder)=> {
    const [value, setValue] = useState(startValue);
    function increment(){
        if(value < 10){
            setValue(oldValue => { return oldValue + 1 });
        }
    }

    function decrement(){
        if(value > 1){
            setValue(oldValue => { return oldValue - 1 });
        }
    }

    useEffect(()=>{
        setScore(value);
    }, [value]);

    return (
        <div className="score-adder-grid">                                  
            <button onClick={decrement} className="score-btn minus">
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <Score value={value} />
            <button onClick={increment} className="score-btn plus">
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    )
}
