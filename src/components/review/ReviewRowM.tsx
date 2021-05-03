/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment} from 'react'
import { Link } from "react-router-dom"
import { Score } from '../movie/Score';
import LikeAdder from './LikeAdder';
import { normalFormat } from '../../dateParser';
import "./reviewStyle.css";
import { ESize, useImage } from '../../hooks';
import { IReviewRow } from './ReviewRow';
import { linkSrc } from '../../callers/reviewCaller';

export const ReviewRowM: React.FC<IReviewRow> = ({review, onDelete}: IReviewRow)=> {
    const [reviewText, setReviewText] = useState(<p ></p>);
    const briefText = <Fragment><p className="review-text">{review.text.substring(0, 500)}</p><p onClick={showAll} className="show-more">Show more</p></Fragment>;
    const [titleClass, setTitleClass] = useState("movie-title");
    const [avatarSrc, avatarError] = useImage("/rewer/uploads/avatars", `${review.userName}.jpg`, ESize.Small);
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
        if(review.text.length > 500){
            showLess();
        } else {
            setReviewText(<p className="review-text">{review.text}</p>);
        }
        if(review.score > 6){
            setTitleClass("movie-title title-high");
        } else if(review.score > 3){
            setTitleClass("movie-title title-medium");
        } else {
            setTitleClass("movie-title title-low");
        }
    }, [review]);

    function showAll(){
        setReviewText(<Fragment><p className="review-text">{review.text}</p><p onClick={showLess} className="show-more">Show less</p></Fragment>);
    }

    function showLess(){
        setReviewText(briefText);
    }

    return (
        <div className={mainClass} >
            <div className="review-grid">
                {(review.nickName != null && review.nickName !== "")?
                (<Link to={`/rewer/user?userName=${review.userName}`}>
                    <img className="avatar" src={avatarSrc} alt={`avatar_${review.nickName}`} onError={avatarError} />
                </Link>):
                (<p></p>)}  
                <Link className="nick-name" to={`/rewer/user?userName=${review.userName}`}>{review.nickName}</Link>
                <Score value={review.score} />
            </div>
            {(review.seriesId) ?
            (<Fragment>
                <Link className={titleClass} to={`/rewer/series?seriesId=${review.seriesId}`}>{review.seriesTitle}:</Link><br/><br/>              
            </Fragment>):
            (<Fragment></Fragment>)}
            <Link className={titleClass} to={linkSrc(review)}>{review.entryTitle}</Link>
            {reviewText}
            <LikeAdder reviewLike={review.myLike} onDelete={onDelete} popIndex={review.popIndex} reviewDate={normalFormat(review.date)} />
        </div>
    )
}
export default ReviewRowM;