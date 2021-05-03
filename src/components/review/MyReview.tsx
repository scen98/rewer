/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { reviewPath } from "../../callers/reviewCaller"
import LoginMsg from '../profile/LoginMsg';
import { AddedReview } from './AddedReview';
import { PostReview } from './PostReview';
import { IReview } from "../../../common/review"
import { IEntry } from '../../../common/movie';
import { ECallType, usePOST } from '../../callers/caller';
import { isEntryReleased } from '../../callers/movieCaller';

interface IMyReview{
    entry: IEntry;
}

export const MyReview: React.FC<IMyReview> = ({entry}: IMyReview) => { 
    const [reviewContent, setReviewContent] = useState(<PostReview review={{id: 0, text: "", entryId: entry.id, date: "", popIndex: 0, score: 5, userName: localStorage.getItem("userName")}} onPost={postReview} />);
    const [mainMsg, setMainMsg] = useState("");
    const [reviewCaller, reviewSignal] = usePOST();

    useEffect(()=>{
        if(localStorage.getItem("userName") == null){
            setReviewContent(<LoginMsg message={"to post a review."} />);
        } else {
            if(entry.id > 0){
                getMyReview();
            }
        }
        async function getMyReview(){
           const myReview: IReview = await reviewCaller({ userName: localStorage.getItem("userName"), movieId: entry.id, limit: 1, offset: 0}, reviewPath.selectReviewByUserAndMovie, ECallType.SELECT);
            if(myReview){
                setReviewContent(<AddedReview review={myReview} onEdit={startEditing} onDelete={removeReview} />);                 
            } else{
                setMainMsg("You haven't posted a review for this movie yet.");
                setReviewContent(<PostReview review={{id: 0, text: "", entryId: entry.id, date: "", popIndex: 0, score: 5, userName: localStorage.getItem("userName")}} onPost={postReview} />);  
            }
        }
        return ()=>{
            reviewSignal.abort();
        }
    }, [entry.id]);

    useEffect(()=>{
        if(!isEntryReleased(entry)){
            setReviewContent(<p>Not released yet.</p>);
            setMainMsg("");
        }
    }, [entry]);

    function startEditing(review: IReview){
        setReviewContent(<PostReview review={review} onPost={saveReview} /> );
        setMainMsg("Editing your review:");
    }

    async function saveReview(review: IReview){
        const fetchResult = await reviewCaller(review, reviewPath.updateReview, ECallType.ISOK);
        if(fetchResult){
            setReviewContent(<AddedReview review={review} onEdit={startEditing} onDelete={removeReview} />);
            setMainMsg("Review has been updated.");
        }
    }

    async function postReview(review: IReview){
        const newId = await reviewCaller(review, reviewPath.insertReview, ECallType.INSERT);
        if(newId){
            review = {...review, id: newId, date: new Date().toLocaleDateString("hu-HU"), popIndex: 1};
            setReviewContent(<AddedReview review={review} onEdit={startEditing} onDelete={removeReview} />);
            setMainMsg("Your review has been posted.");
        } else {
            alert("Server error: could not post your review.");
        }
    }

    async function removeReview(review: IReview){
        const fetchResult = await reviewCaller({ id: review.id }, reviewPath.deleteReview, ECallType.ISOK);
        if(fetchResult){
            setMainMsg("Your review has been deleted.");
            setReviewContent(<PostReview review={{id: 0, text: "", entryId: entry.id, date: "", popIndex: 0, score: 5, userName: localStorage.getItem("userName")}} onPost={postReview} /> );
        } else {
            alert("Server error: could not delete your review.");
        }
    }

    return (
        <Fragment>
            <h3 className="center-text">My Review</h3>
            <p className="center-text">{mainMsg}</p>
            <div className="review-container">
                {reviewContent}
            </div>
        </Fragment>
    )
}
