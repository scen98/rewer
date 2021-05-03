import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { IEntryCast } from '../../../common/cast';
import { getYear } from '../../dateParser'
import { ESize, useImage } from '../../hooks';

interface IArtistCastRow{
    cast: IEntryCast;
}

export const ArtistCastRow: React.FC<IArtistCastRow> = ({cast}: IArtistCastRow)=> {
    const [castName, setCastName] = useState<string>(cast.name);
    const [imgsrc, onImgError] = useImage("/rewer/uploads/posters", `${cast.entryId}.jpg`, ESize.Small);
    useEffect(()=>{
        if(cast.castTypeId > 3){
            setCastName(cast.name);
        } else {
           setNonActor();
        }
        function setNonActor(){
        if(cast.name === ""){
            setCastName(cast.castTypeName);
        } else {
            setCastName(`${cast.castTypeName} (${cast.name})`);
        }
    }
    }, [cast]);
        
    function getLink(){
        if(cast.entryType === 3){
            return `/rewer/game?gameId=${cast.entryId}`;
        }
        return `/rewer/movie?movieId=${cast.entryId}`;
    }

    return (
        <div>
            <div className="cast-row">
            <img src={imgsrc} onError={onImgError} alt={cast.entryTitle} />
            <span><Link to={getLink} >{`${cast.entryTitle} (${getYear(cast.entryDate)})`}</Link></span>
            <p>{castName}</p>
        </div>
        </div>
    )
}

export default ArtistCastRow;
