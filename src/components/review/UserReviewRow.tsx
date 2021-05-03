/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { IReviewRow, ReviewRow } from './ReviewRow'
import { Link } from "react-router-dom"
import { ESize, useImage } from '../../hooks';
import { linkSrc } from '../../callers/reviewCaller';

export const UserReviewRow: React.FC<IReviewRow> = ({review, onDelete}: IReviewRow)=> {
    const [imgsrc, onImgError, setImgsrc] = useImage("/rewer/uploads/posters", `0.jpg`, ESize.Small, true);
    useEffect(() => {     
        if(review.seriesId){
            setImgsrc("/rewer/uploads/seriesposters", `${review.seriesId}.jpg`);
        } else {
            setImgsrc("/rewer/uploads/posters", `${review.entryId}.jpg`);
        }
    }, [review]);

    return (
        <div className="followed-review-grid">
            <div className="review-poster-container">          
                    {(review.seriesId != null)?
                    (<Fragment><Link  to={`/rewer/series?seriesId=${review.seriesId}`} >
                        <img src={imgsrc} alt={`${review.entryTitle}-poster`} onError={onImgError} className="review-poster" />
                        <p>{review.seriesTitle}</p>
                        </Link>
                        <Link to={linkSrc(review)}><p>{review.entryTitle}</p></Link>
                    </Fragment>
                    ):
                    (<Link to={linkSrc(review)} >
                        <img src={imgsrc} alt={`${review.entryTitle}-poster`} onError={onImgError} />
                        <p>{review.entryTitle}</p>
                    </Link>)}
            </div>
            <div>
                <ReviewRow review={review} onDelete={onDelete} />
            </div>
        </div>
    )
}

export default UserReviewRow;