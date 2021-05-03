/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment} from 'react'
import { useAsyncReference, useScroll } from '../hooks';
import { getParameter } from '../urlManager';
import UserReviewRow from "../components/review/UserReviewRow";
import ReviewOrderBySelect from '../components/review/ReviewOrderBySelect';
import UserInfo from '../components/profile/UserInfo';
import ReviewRowM from '../components/review/ReviewRowM';
import SearchSide from '../components/SearchSide';
import FeaturedSeriesSides from '../components/series/FeaturedSeriesSides';
import FeaturedSides from '../components/movie/FeaturedSides';
import { userPath } from '../callers/userCaller';
import { EReviewOrderBy, reviewPath } from '../callers/reviewCaller';
import { IReview } from '../../common/review';
import { ECallType, usePOST } from '../callers/caller';
import { IDetailedUser } from '../../common/user';
import UserReviewRowM from '../components/review/UserReviewRowM';
import ListLoad from '../components/ListLoad';

export default function User() {
    const [user, setUser] = useState<IDetailedUser>({userName: getParameter("userName"), nickName: "", permission: 1, about: ""});
    const [reviews, setReviews] = useAsyncReference([]);
    const reviewPerPage = 5;
    const [orderBy, setOrderBy] = useState(EReviewOrderBy.date);
    const [userCaller, signal] = usePOST();
    const [addScroll, removeScroll] = useScroll(0.9, getMoreReviews);
    const [mainMsg, setMainMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getUserInfo();
        return ()=>{
            removeScroll();
            signal.abort();
        }
    }, []);

    useEffect(()=>{
        if(user) document.title = `${user.nickName} - Rewer`;
    }, [user])

    useEffect(()=>{
        requestReviews();
        return ()=>{
            removeScroll();
            signal.abort();
        }
    }, [orderBy]);

    async function getUserInfo(){
        const userInfo: IDetailedUser = await userCaller({ userName: getParameter("userName") }, userPath.selectDetailedUser, ECallType.SELECT);
        if(userInfo){
            setUser(userInfo);
        }
    }

    async function requestReviews(){
        setReviews([]);
        setIsLoading(true);        
        removeScroll();
        let userReviews: IReview [] = await userCaller({ userName: user.userName, limit: reviewPerPage, offset: 0, orderby: orderBy }, reviewPath.selectReviewsByUser, ECallType.SELECT);
        if(userReviews){
            setReviews(userReviews);
            if(userReviews.length === reviewPerPage) addScroll();
            if(userReviews.length === 0) setMainMsg(`${user.nickName} hasn't posted any reviews yet.`);
        }
        setIsLoading(false);
    }

    async function getMoreReviews(){
        setIsLoading(true);
        removeScroll()
        const requestedReviews = await userCaller({ userName: user.userName, limit: reviewPerPage, offset: reviews.current.length, orderby: orderBy }, reviewPath.selectReviewsByUser, ECallType.SELECT);
        if(requestedReviews){
            setReviews([...reviews.current, ...requestedReviews]);
            if(requestedReviews.length === reviewPerPage) addScroll();
        }
        setIsLoading(false);
    }

    async function deleteReview(reviewId: number){
        if(await userCaller({ id: reviewId }, reviewPath.deleteReview, ECallType.ISOK)){
            setReviews(reviews.current.filter(r=> r.id !== reviewId));
        }
    }

    return (
        <Fragment>
            {window.screen.width > 800 ?
            (<div className="main-grid">
                <div className="left-item">
                    <div className="side-container medium-side">
                        <FeaturedSides />
                    </div>
                </div>
                <div className="main-item">
                    <UserInfo user={user} />
                    <div className="divider" />
                    <h2 className="center-text">{user.nickName}'s reviews</h2>
                    <ReviewOrderBySelect defaultValue={orderBy} onUpdate={(newValue: EReviewOrderBy)=> { setOrderBy(newValue); }} />
                    {window.screen.width > 600 ? 
                    (<Fragment>{reviews.current.map(r=> {
                        return <UserReviewRow key={`review-${r.id}`} review={{...r, nickName: ""}} onDelete={deleteReview} />
                    })}
                    <ListLoad text={mainMsg} isLoading={isLoading} />
                    </Fragment>) :
                    (<Fragment>{reviews.current.map(r=>{
                        return <UserReviewRowM key={`review-${r.id}`} review={{...r, nickName: ""}} onDelete={deleteReview} />
                    })}
                    <ListLoad text={mainMsg} isLoading={isLoading} />
                    </Fragment>)
                    }
                </div>
                <div className="right-item">
                    <div className="side-container medium-side">
                        <SearchSide />
                    </div>
                    <div className="side-container medium-side">
                        <FeaturedSeriesSides />
                    </div>
                </div>
            </div>):
            (<div className="main-container">
                <UserInfo user={user} />
                <br/>
                <h2>{user.nickName}'s reviews</h2>
                <ReviewOrderBySelect defaultValue={orderBy} onUpdate={(newValue: EReviewOrderBy)=> { setOrderBy(newValue); }} />
                {window.screen.width > 600 ? 
                (<Fragment>{reviews.current.map(r=> {
                    return <UserReviewRow key={`review-${r.id}`} review={{...r, nickName: ""}} onDelete={deleteReview} />
                })}
                <ListLoad text={mainMsg} isLoading={isLoading} />
                </Fragment>) :
                (<Fragment>{reviews.current.map(r=>{
                    return <UserReviewRowM key={`review-${r.id}`} review={{...r, nickName: ""}} onDelete={deleteReview} />
                })}
                <ListLoad text={mainMsg} isLoading={isLoading} />
                </Fragment>)
                }
            </div>)}
        </Fragment>
        
    )
}
