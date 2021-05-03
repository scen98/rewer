import React, { useRef } from 'react'
import { EReviewOrderBy } from '../../callers/reviewCaller';

interface IReviewOrderBySelect{
   defaultValue: EReviewOrderBy;
   onUpdate: (newValue: EReviewOrderBy) => void;
}

export const ReviewOrderBySelect: React.FC<IReviewOrderBySelect> = ({defaultValue, onUpdate}: IReviewOrderBySelect) => {
    const select = useRef<HTMLSelectElement>();
    function update(){
        onUpdate(EReviewOrderBy[select.current.value]);
    }
    return (
        <select ref={select} onChange={update} value={defaultValue}>
            <option value={EReviewOrderBy.popIndex}>Most popular</option>
            <option value={EReviewOrderBy.date}>Latest</option>
        </select>
    )
}

export default ReviewOrderBySelect;
