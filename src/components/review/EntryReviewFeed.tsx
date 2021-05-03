/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { normalFormat } from '../../dateParser';
import { useAsyncReference, useScroll } from '../../hooks';
import { EReviewOrderBy, reviewPath } from "../../callers/reviewCaller";
import ReviewList from './ReviewList';
import ReviewOrderBySelect from './ReviewOrderBySelect';
import { IEntry } from '../../../common/movie';
import { ECallType, usePOST } from '../../callers/caller';
import { isEntryReleased } from '../../callers/movieCaller';
import ListLoad from '../ListLoad';

interface IEntryReviewFeed{
    entry: IEntry;
}

export const EntryReviewFeed: React.FC<IEntryReviewFeed> = ({entry}: IEntryReviewFeed) => {
    const [reviews, setReviews] = useAsyncReference([]);
    const [orderBy, setOrderBy] = useState<EReviewOrderBy>(undefined);
    const [reviewHeader, setReviewHeader] = useState<string>("");
    const reviewPerPage = 10;
    const [reviewCaller, reviewSignal] = usePOST();
    const [addScroll, removeScroll] = useScroll(0.9, getMoreReviews);
    const [mainMsg, setMainMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        return ()=> {
            removeScroll();
            reviewSignal.abort();
        }
    }, []);

    useEffect(()=>{
        if(isEntryReleased(entry)){
            if(orderBy === EReviewOrderBy.popIndex){
                if(entry.id > 0) getReviews();
            } else {
                setOrderBy(EReviewOrderBy.popIndex);
            }          
        } else {
            setReviewHeader(`Reviews will be available on ${normalFormat(entry.releaseDate.toString())}`);
        }
        return ()=> {
            removeScroll();
        }
    }, [entry.id, entry.releaseDate]);

    useEffect(()=>{
        if(entry.id > 0 && orderBy != null){
            getReviews();
        }
        return ()=> {
            removeScroll();
        }
    }, [orderBy]);

    async function getReviews(){
        setReviews([]);
        setIsLoading(true);
        const requestedReviews = await reviewCaller({ movieId: entry.id, limit: reviewPerPage, offset: 0, orderby: orderBy}, reviewPath.selectReviewsByMovie);
        if(requestedReviews){
            setReviews(requestedReviews);
            setReviewHeader("Reviews");
            if(requestedReviews.length === 0) setMainMsg("There are no reviews posted yet.");
            if(requestedReviews.length === reviewPerPage) addScroll();
        } else {
            setReviewHeader("Server errror: could not download reviewdata.");
        }
        setIsLoading(false);
    }

    async function getMoreReviews(){
        setIsLoading(true);
        removeScroll();
        const requestedReviews = await reviewCaller({ movieId: entry.id, limit: reviewPerPage, offset: reviews.current.length, orderby: orderBy}, reviewPath.selectReviewsByMovie);
        if(requestedReviews){
            setReviews([...reviews.current, ...requestedReviews]);
            if(requestedReviews.length === reviewPerPage) addScroll();
        } else {
            setReviewHeader("Server errror: could not download reviewdata.");
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
            <div className="divider" />
            <h2 className="center-text">{reviewHeader}</h2>
            {isEntryReleased(entry) ?
            (<Fragment>
                <ReviewOrderBySelect defaultValue={orderBy} onUpdate={(newValue: EReviewOrderBy)=> { setOrderBy(newValue); }} />                
                <ReviewList onDelete={deleteReview} reviews={reviews.current} />
                <ListLoad text={mainMsg} isLoading={isLoading} />
            </Fragment>): 
            (<Fragment></Fragment>)}    
        </div>
    )
}
export default EntryReviewFeed;