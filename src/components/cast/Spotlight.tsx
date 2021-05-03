/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ICast } from '../../../common/cast';
import SpotlightRow from './SpotlightRow';
import "./castStyle.css"

interface ISpotlight{
    casts: ICast[];
    length: number;
}

export const Spotlight: React.FC<ISpotlight> = ({casts, length}: ISpotlight) => {
    const [mixedCasts, setMixedCasts] = useState([]);

    useEffect(()=>{
         setMixedCasts(generateMixedCasts(casts));
    }, [casts]);
    
    function generateMixedCasts(fullCasts: ICast[]){
        let mixedLength: number;
        if(fullCasts.length < length){
            mixedLength = fullCasts.length;
        } else {
            mixedLength = length;
        }
        let ref = fullCasts.filter(c=> c.castTypeId === 4 || c.castTypeId === 5);
        let mixedCasts: ICast[] = [];
        let i: number;
        let selected: ICast;
        for(i=0; mixedLength > i; i++){
            selected = ref[Math.floor(Math.random()*ref.length)];
            mixedCasts.push(selected);
            ref = ref.filter(c=> c.artistId !== selected.artistId);
        }
        return mixedCasts;
    }

    return (
        <div>
            <h3 className="center-text">Spotlight</h3>
            {mixedCasts.map(c=>{
                return <SpotlightRow key={`sportlight-${c.id}`} cast={c} />
            })}
        </div>
    )
}
export default Spotlight;