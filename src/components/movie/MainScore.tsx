import React, { useState, useEffect, Fragment } from 'react'

interface IScore{
    value: number;
}

export const MainScore: React.FC<IScore> = ({value}: IScore) => {
    const [scoreClass, setScoreClass] = useState("score");
    useEffect(()=>{
         if(value > 6){
            setScoreClass("main-score high");
        } else if(value > 3){
            setScoreClass("main-score");
        } else if(value > 0) {
            setScoreClass("main-score low");
        } else {
            setScoreClass("main-score unset");
        }
    }, [value]);
    return (
        <div className={scoreClass}>
            <p>{Math.round(value * 10)/10 === 0 ?
                (<Fragment>?</Fragment>):
                (<Fragment>{Math.round(value * 10)/10}</Fragment>)}
            </p>
        </div>
    )
}

export default MainScore;