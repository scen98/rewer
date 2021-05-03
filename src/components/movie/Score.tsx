import React, { useState, useEffect } from 'react'

interface IScore{
    value: number;
}

export const Score: React.FC<IScore> = ({value}: IScore) => {
    const [scoreClass, setScoreClass] = useState("score");
    useEffect(()=>{
        if(value > 6){
            setScoreClass("score high");
        } else if(value > 3){
            setScoreClass("score");
        } else if(value > 0) {
            setScoreClass("score low");
        } else {
            setScoreClass("score unset");
        }
    }, [value])
    return (
        <div className={scoreClass}>
            <p>{Math.round(value*10) / 10}</p>
        </div>
    )
}
