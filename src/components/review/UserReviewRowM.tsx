/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import React, { Fragment, useEffect, useState } from 'react'
import { useImage, ESize } from '../../hooks';
import { IReviewRow } from './ReviewRow';
import { Link } from "react-router-dom"
import { normalFormat } from '../../dateParser';
import { Score } from '../movie/Score';
import LikeAdder from './LikeAdder';
import { linkSrc } from '../../callers/reviewCaller';

export const UserReviewRowM: React.FC<IReviewRow> = ({review, onDelete}: IReviewRow)=> {
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
        console.log("HEY")
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
        <div className="user-review-row-m">
            <p>
                {(review.seriesId) ?
                (<Fragment>
                    <Link className={titleClass} to={`/rewer/series?seriesId=${review.seriesId}`}>{review.seriesTitle}:</Link><br/><br/>              
                </Fragment>):
                (<Fragment></Fragment>)}
                <Link className={titleClass} to={linkSrc(review)}>{review.entryTitle}</Link>
            </p>         
            <Score value={review.score} />
        </div>
        {reviewText}
        <LikeAdder reviewLike={review.myLike} onDelete={onDelete} popIndex={review.popIndex} reviewDate={normalFormat(review.date)} />
    </div>
    )
}

export default UserReviewRowM;