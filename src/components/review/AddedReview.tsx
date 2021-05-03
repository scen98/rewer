import React, { Fragment, useEffect } from 'react'
import { IReview } from '../../../common/review'
import { generateFakeErrorMessage } from '../../callers/articleCaller'
import { normalFormat } from '../../dateParser'
import { Score } from '../movie/Score'
import "./reviewStyle.css"

interface IEditableReview{
    review: IReview;
    onEdit: (rev: IReview) => void;
    onDelete: (toDelete: IReview)=> void;
}

export const AddedReview: React.FC<IEditableReview> = ({review, onEdit, onDelete}: IEditableReview)=> {
    function edit(){
        onEdit(review);
    }

    function removeReview(){
        onDelete(review);
    }

    return (
        <Fragment>
            <div className="review-grid">
                <button onClick={edit} >Edit</button>                                               
                <button onClick={removeReview}>Delete</button>
                <Score value={review.score} />
            </div>
            <p>{review.text}</p>
            <div className="like-adder">
                <div>
                <span>{review.popIndex} <i>likes</i></span>
                </div>
                <span className="review-date">{normalFormat(review.date)}</span>
            </div>     
        </Fragment>
    )
}

export default AddedReview;