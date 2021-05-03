import express from "express";
import { userSession } from "../config/sessionConfig";
import { returnError } from "../midwares/midutils";
import { selectReviewsByUserAndMovie, selectReviewsByMovie, insertReview, deleteReview, updateReview, insertReviewLike, updateReviewLike, selectFollowedReviews, selectReviewsByUser } from "../midwares/reviewMWare";

var controller = express.Router();
controller.use(express.json());

controller.use(userSession());

controller.post("/select_review_by_user_and_movie", async function (req:any, res:any){
    try{
        await selectReviewsByUserAndMovie(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/select_reviews_by_movie", async function (req:any, res:any){
    try{
        await selectReviewsByMovie(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/insert_review", async function (req:any, res:any){
    try{
        await insertReview(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/delete_review", async function (req:any, res:any){
    try{
        await deleteReview(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/update_review", async function (req:any, res:any){
    try{
        await updateReview(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/insert_reviewlike", async function (req:any, res:any){
    try{
        await insertReviewLike(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/update_reviewlike", async function (req:any, res:any){
    try{
        await updateReviewLike(req, res);
    } catch(err){
        returnError(res, err);
    }
}); 

controller.post("/select_followed_reviews", async function (req:any, res:any){
    try{
        await selectFollowedReviews(req, res);
    } catch(err){
        returnError(res, err);
    }
}); 

controller.post("/select_reviews_by_user", async function (req:any, res:any){
    try{
        await selectReviewsByUser(req, res);
    } catch(err){
        returnError(res, err);
    }
}); 

module.exports = controller;