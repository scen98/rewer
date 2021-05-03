/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "./reviewStyle.css"
import { IReviewLike } from '../../../common/reviewLike'
import { reviewPath } from '../../callers/reviewCaller'
import { ECallType, usePOST } from '../../callers/caller'
import { IModalContext, ModalContext } from '../Modal'
import { MessageContext } from '../Messenger'

interface ILikeAdder{
    reviewLike: IReviewLike;
    popIndex: number;
    onDelete?: (reviewId: number) => void;
    reviewDate?: string;
    //onUpdate: (newPopIndex: number) => void;
}

export const LikeAdder: React.FC<ILikeAdder> = ({reviewLike, popIndex, onDelete, reviewDate}: ILikeAdder) => {
    const { showModal } = useContext<IModalContext>(ModalContext);
    const [getReviewLike, setReviewLike] = useState(reviewLike);
    const [getPopIndex, setPopIndex] = useState(popIndex);
    const [thumbsUpClass, setThumbsUpClass] = useState("");
    const [thumbsDownClass, setThumbsDownClass] = useState("");
    const likeBtn = useRef<HTMLDivElement>();
    const dislikeBtn = useRef<HTMLDivElement>();
    const [caller, signal] = usePOST();  
    const { messenger } = useContext(MessageContext)

    function upVote(){
        let newReviewLike: IReviewLike;
        if(getReviewLike.value === 1){
            newReviewLike = {...getReviewLike, value: 0};
        } else if(getReviewLike.value === 0) {
            newReviewLike = {...getReviewLike, value: 1};
        } else { //===-1
            newReviewLike = {...getReviewLike, value: 1};
        }
        if(getReviewLike.id > 0){
            updateLike(newReviewLike);
        } else {
            insertLike(newReviewLike);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("userName") == null){
            likeBtn.current.style.display = "none";
            dislikeBtn.current.style.display = "none";
        }
        return ()=>{
            signal.abort();
            messenger.clear();
        }
    }, []);

    function downVote(){
        let newReviewLike: IReviewLike;
        if(getReviewLike.value === -1){
            newReviewLike = {...getReviewLike, value: 0};
        } else if(getReviewLike.value === 0) {
            newReviewLike = {...getReviewLike, value: -1};
        } else { //=== 1
            newReviewLike = {...getReviewLike, value: -1};
        }
        if(getReviewLike.id > 0){
            updateLike(newReviewLike);
        } else {
            insertLike(newReviewLike);
        }
    }

    function updatePopIndex(newReviewLike: IReviewLike){ //has to be called before updating the reviewlike, since it is dependant on the old value
        const difference = newReviewLike.value - getReviewLike.value;
        setPopIndex(oldPopIndex => { return oldPopIndex + difference});
    }

    async function insertLike(toInsert: IReviewLike){
        const newId = await caller(toInsert, reviewPath.insertReviewLike, ECallType.INSERT);
        const newReviewLike = {...getReviewLike, id: newId, value: toInsert.value};
        updatePopIndex(newReviewLike);
        setReviewLike(newReviewLike);
        if(newReviewLike == null || newReviewLike.id < 1){
            messenger.addFail("Server error: could not like/dislike the selected review.");
        }
    }

    async function updateLike(toUpdate: IReviewLike){
        setReviewLike(toUpdate);
        updatePopIndex(toUpdate);
        if(!await caller(toUpdate, reviewPath.updateReviewLike, ECallType.ISOK)){  
            messenger.addFail("Server error: could not like/dislike the selected revie.w");
        }
    }

    async function deleteReview(){
        onDelete(reviewLike.reviewId);
    }

    useEffect(()=>{
        setDefaultColor();
        if(getReviewLike){
            if(getReviewLike.value === 1){
                setThumbsUpClass("up-arrow liked");
            } else if(getReviewLike.value === -1){
                setThumbsDownClass("down-arrow disliked");
            } 
        }
    }, [getReviewLike]); 

    function setDefaultColor(){
        setThumbsUpClass("up-arrow unliked");
        setThumbsDownClass("down-arrow unliked");
    }

    function displayModal(){
        showModal(deleteReview, 
            { 
                title: "Removing review",
                content:<Fragment>
                            <p>If you delete this review, it won't be possible to retrieve it later.</p>
                            <p>Are you certain you still want to proceed?</p>
                        </Fragment>,
                acceptButton: <Fragment>Delete review</Fragment>,
                refuseButton: <Fragment>Cancel</Fragment>
            }
        )
    }

    return (
        <div className="like-adder">
            <div>
                <span ref={likeBtn} className={thumbsUpClass} ><FontAwesomeIcon onClick={upVote} icon={faThumbsUp} /></span>            
                <span className="pop-index">{getPopIndex}</span>
                <span ref={dislikeBtn} className={thumbsDownClass} ><FontAwesomeIcon onClick={downVote} icon={faThumbsDown} /></span>
            </div>
            <div className="review-date">
            <span className="review-date">{reviewDate}</span>
                {(localStorage.getItem("permission") && parseInt(localStorage.getItem("permission")) > 1)?
                (<span className={"delete-icon"}>
                    <FontAwesomeIcon onClick={displayModal} icon={faTrashAlt} />
                </span>):
                (<Fragment></Fragment>)}
            </div>     
        </div>
    )
}

export default LikeAdder;
