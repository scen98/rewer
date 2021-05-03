import React from 'react'
import { IReview } from '../../../common/review';
import { ReviewRow } from './ReviewRow';

interface IReviewList{
    reviews: IReview[];
    onDelete: (reviewId: number) => void;
}

export const ReviewList: React.FC<IReviewList> = ({reviews, onDelete}: IReviewList) => {
    return (
        <div>
            {reviews.map(r=>{
                return <ReviewRow key={`review-${r.id}`} onDelete={onDelete} review={r} />
            })}
        </div>
    )
}

export default ReviewList;