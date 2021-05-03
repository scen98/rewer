import React from 'react'
import { Link } from "react-router-dom"
import { ICast } from '../../../common/cast';
import { ESize, useImage } from '../../hooks';
import "./castStyle.css"

interface ICastRow{
    cast: ICast;
}

export const CastRow: React.FC<ICastRow> = ({cast}: ICastRow) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/portraits", `${cast.artistId}.jpg`, ESize.Small);
    return (
        <div className="cast-row">
            <img src={imgsrc} onError={onImgError} alt={cast.artistName} />
            <span><Link to={`/rewer/star?artistId=${cast.artistId}`} >{cast.artistName}</Link></span>
            <p className="cast-row-item">{cast.name}</p>
        </div>
    )
}

export default CastRow;