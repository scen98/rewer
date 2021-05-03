/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment, useState } from 'react'

import { Link } from "react-router-dom"
import "./reviewStyle.css"
import { normalFormat } from '../../dateParser'
import { Score } from '../movie/Score'
import LikeAdder from './LikeAdder'
import { IReview } from '../../../common/review'
import { ESize, useCutter, useImage } from '../../hooks'
import "../profile/profileStyle.css";

export interface IReviewRow{
    review: IReview;
    onDelete: (reviewId: number) => void;
}

export const ReviewRow: React.FC<IReviewRow> = ({review, onDelete}: IReviewRow) => {
    const [reviewText, isReviewCut, cutReviewText] = useCutter(review.text, 500);
    const [imgsrc, onImgError] = useImage("/rewer/uploads/avatars", `${review.userName}.jpg`, ESize.Small, true);
    const maxCharCount = 500;
    const [mainClass, setMainClass] = useState("review-container");

    useEffect(()=>{
        if(review.score > 6){
            setMainClass("review-container review-high");
        } else if(review.score > 3){
            setMainClass("review-container review-medium");
        } else if(review.score > 0) {
            setMainClass("review-container review-low");
        } else {
            setMainClass("review-container");
        }
    }, [review.score]);

    useEffect(()=>{
        cutReviewText(review.text, maxCharCount);
    }, [review]);
 
    return (
        <div className={mainClass}>
            <div className="review-grid">
                {(review.nickName != null && review.nickName !== "")?
                (<Link to={`/review/user?userName=${review.userName}`}>
                    <img className="avatar" src={imgsrc} onError={onImgError} alt={`avatar_${review.userName}`} />
                </Link>):
                (<p></p>)} 
                <Link className="nick-name" to={`/rewer/user?userName=${review.userName}`}>{review.nickName}</Link>
                <Score value={review.score} />
            </div>
            {reviewText}
            {(isReviewCut)?
            (<Fragment><p onClick={()=>{ cutReviewText(review.text) }} className="show-more">Show more</p></Fragment>):
            (<Fragment>{(review.text.length > maxCharCount)? 
                (<p onClick={ ()=>{ cutReviewText(review.text, maxCharCount) }} className="show-more">Show less</p>): 
                (<Fragment></Fragment>)}</Fragment>)}
            <LikeAdder reviewLike={review.myLike} popIndex={review.popIndex} onDelete={onDelete} reviewDate={normalFormat(review.date)} />
        </div>
    )
}
