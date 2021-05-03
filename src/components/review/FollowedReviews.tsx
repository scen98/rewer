/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from 'react'
import { useAsyncReference, useScroll } from '../../hooks';
import UserReviewRow from './UserReviewRow';
import ReviewRowM from './ReviewRowM';
import LoginMsg from '../profile/LoginMsg';
import { reviewPath } from '../../callers/reviewCaller';
import { ECallType, usePOST } from '../../callers/caller';
import ListLoad from '../ListLoad';

export default function FollowedReviews() {
    const [reviews, setReviews] = useAsyncReference([]); //for the listeners
    const downloadCount = 10;
    const [errorMsg, setErrorMsg] = useState(<Fragment></Fragment>);
    const [reviewCaller, signal] = usePOST({ limit: downloadCount, offset: 0 }, reviewPath.selectFollowedReviews);
    const [addScroll, removeScroll] = useScroll(0.9, showMore);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(localStorage.getItem("userName")) requestReviews();         
        return ()=> {
            signal.abort();
            removeScroll();
        }
    }, []);
    
    async function requestReviews(){
        setIsLoading(true);
        const followedReviews = await reviewCaller({ limit: downloadCount, offset: 0 }, reviewPath.selectFollowedReviews, ECallType.SELECT);
        if(followedReviews){
            setReviews(followedReviews);
            if(followedReviews.length === downloadCount){
                addScroll();
            }
            if(followedReviews.length === 0){
                setErrorMsg(<p className="center-text">The people you follow haven't posted anything yet.</p>)
            }
        } else {
            if(localStorage.getItem("userName") != null)  setTimeout(tryRequestReviews, 3000);
        }
        setIsLoading(false);
    }

    async function tryRequestReviews(){
        const followedReviews = await reviewCaller({ limit: downloadCount, offset: 0 }, reviewPath.selectFollowedReviews, ECallType.SELECT);
        if(followedReviews){
            setReviews(followedReviews);
            if(followedReviews.length === downloadCount){
                addScroll();
            }
        } else {
            setErrorMsg(<LoginMsg message="manage your followers." />);
        }
    }

    async function showMore(){
        setIsLoading(true);
        removeScroll(); //make sure the listener doenst fire again until we downloaded the new reviews
        const followedReviews = await reviewCaller({limit: downloadCount, offset: reviews.current.length}, reviewPath.selectFollowedReviews, ECallType.SELECT);
        if(followedReviews){
            setReviews([...reviews.current, ...followedReviews]);
            if(followedReviews.length === downloadCount){
                addScroll();
            }
        }
        setIsLoading(false);
    }

    async function deleteReview(reviewId: number){
        if(await reviewCaller({ id: reviewId }, reviewPath.deleteReview, ECallType.ISOK)){
            setReviews(reviews.current.filter(r=> r.id !== reviewId));
        }
    }

    return (
        <div>
            {window.screen.width > 600 ? 
            (<Fragment>
                {errorMsg}
                {(localStorage.getItem("userName") == null)?
                (<LoginMsg message={"to follow other reviewers."} />):
                (<Fragment></Fragment>)}
                {reviews.current.map(r=> {
                return <UserReviewRow key={`followed-${r.id}`} review={r} onDelete={deleteReview} />
                })}
                <ListLoad isLoading={isLoading} />
            </Fragment>) :
            (<Fragment>
                {errorMsg}
                {reviews.current.map(r=> {
                return <ReviewRowM key={`followed-${r.id}`} review={r} onDelete={deleteReview} />
                })}
                <ListLoad isLoading={isLoading} />
            </Fragment>)
            }
        </div>
    )
}
