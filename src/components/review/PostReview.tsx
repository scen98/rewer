import React, { Fragment } from 'react'
import { IReview } from '../../../common/review';
import { useBinder } from '../../hooks'
import { ScoreAdder } from '../movie/ScoreAdder'

interface IPostReview{
    review: IReview;
    onPost: (currentReview: IReview) => void;
}

export const PostReview: React.FC<IPostReview> = ({review, onPost}: IPostReview) => {
    const [myReview, setMyReview, bindMyReview] = useBinder(review);
    function updateScore(newValue: number){
        setMyReview({...myReview, score: newValue});
    }
    return (
        <Fragment>
            <ScoreAdder startValue={review.score} setScore={updateScore}/>    
            <textarea className="review-textarea" name="text" rows={10} value={myReview.text} onChange={bindMyReview} />
            <button onClick={()=>{ onPost(myReview) }}>Post</button>                   
        </Fragment>
    )
}
