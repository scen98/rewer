import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getYear } from '../../dateParser'
import { ISeriesCast } from '../../../common/cast'
import { ESize, useImage } from '../../hooks'
interface IArtistSeriesCastRow{
    cast: ISeriesCast;
}
export const ArtistSeriesCastRow: React.FC<IArtistSeriesCastRow> = ({cast}: IArtistSeriesCastRow)=> {
    const [castName, setCastName] = useState(cast.name);
    const [imgsrc, onImgError] = useImage("/rewer/uploads/seriesposters", `${cast.seriesId}.jpg`, ESize.Small);
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
    
    return (
        <div>
            <div className="cast-row">
            <img src={imgsrc} onError={onImgError} alt={cast.entryTitle} />
            <span><Link to={`/rewer/series?seriesId=${cast.seriesId}`} >{`${cast.seriesTitle} (${getYear(cast.firstEpisodeDate)})`}</Link></span>
            <p>{castName}</p>
        </div>
        </div>
    )
}

export default ArtistSeriesCastRow;
