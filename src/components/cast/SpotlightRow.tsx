import React, { Fragment} from 'react'
import { Link } from "react-router-dom"
import { ICast } from '../../../common/cast';
import { ESize, useImage } from '../../hooks';

interface ISpotlightRow{
    cast: ICast;
}

export const SpotlightRow: React.FC<ISpotlightRow> = ({cast}: ISpotlightRow) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/portraits", `${cast.artistId}.jpg`, ESize.Small);
    return (
        <div className="cast-row">
            <img src={imgsrc} onError={onImgError} alt={`star-${cast.artistName}`} />
            <Link to={`/rewer/star?artistId=${cast.artistId}`} className="line-start" >{cast.artistName}: </Link>
            {window.screen.width >= 1280 ?
            ( <Link to={`/rewer/movie?movieId=${cast.entryId}`} className="line-end" >{cast.entryTitle}</Link>):
            (<Fragment></Fragment>)}      
        </div>
    )
}

export default SpotlightRow;