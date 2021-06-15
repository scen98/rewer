import { doesReviewLikeExistQuery, insertReviewLikeQuery, updateReviewLikeQuery } from "../models/reviewLikeQueries";
import { deleteReviewQuery, doesReviewExistQuery, insertReviewQuery, selectDetailedReviewByUserAndMovieQuery, selectDetailedReviewsByMovieQuery, selectFollowedReviewsQuery, selectReviewQuery, selectReviewsByUserQuery, updateReviewQuery } from "../models/reviewQueries";
import { getLimiter, isUserLogged, return200, return400, return403, return404, return500, returnData, returnError, returnInsert, validateProperties, withMysql } from "./midutils";

export async function insertReview(req:any, res: any){
    if(!validateProperties(res, req.body, ["entryId", "userName"])) return false;
    if(!isUserLogged) return return403(res, "This action requires a running session on the server.");
    if(req.session.user.userName !== req.body.userName) return return403(res);
    await withMysql(
        async (conn)=>{
            if(await doesReviewExistQuery(conn, req.body)){
                return return400(res, "Review already exists.");
            }
            const newId = await insertReviewQuery(conn, { ...req.body, date: new Date()});
            if(newId){
                await insertReviewLikeQuery(conn, { id: 0, userName: req.session.user.userName, reviewId: newId, value: 1});
                return returnInsert(res, newId);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function deleteReview(req:any, res: any){
    if(req.session == null || req.session.user == null) return return403(res);
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            if(req.session.user.permission < 2){
                const validReview = await selectReviewQuery(conn, req.body.id); 
                if(validReview.userName !== req.session.user.userName) return return403(res, "Only users with permission level of 2 or higher can remove other users' reviews.");
            }        
            if(await deleteReviewQuery(conn, req.body.id)){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function insertReviewLike(req: any, res: any){
    if(isUserLogged(req) && req.session.user.userName !== req.body.userName) return return403(res, "This action requires a running session on the server.");
    await withMysql(
        async (conn)=>{
            if(await doesReviewLikeExistQuery(conn, req.body)){
                return return400(res, "Reviewlike already exists.");
            }
            const newId = await insertReviewLikeQuery(conn, req.body);
            if(newId){
                return returnInsert(res, newId);
            }
            return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectFollowedReviews(req: any, res: any){
    const limiter = getLimiter(req.body.limit, req.body.offset)
    if(isUserLogged(req) && req.session.user.userName == null) return return403(res, "This request requires a logged in user.");    
    await withMysql(
        async (conn)=>{            
            const result = await selectFollowedReviewsQuery(conn, req.session.user.userName, limiter.limit, limiter.offset);
            if(result){
                return returnData(res, result);
            } 
            return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function updateReviewLike(req: any, res: any){
    if(isUserLogged(req) && req.session.user.userName !== req.body.userName) return return403(res);
    await withMysql(
        async (conn)=>{        
            if(await updateReviewLikeQuery(conn, req.body)){
                return return200(res);
            }
            return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function updateReview(req: any, res: any){
    if(!validateProperties(res, req.body, ["id"])) return false;
    if(isUserLogged(req) && req.session.user.userName !== req.body.userName) return return403(res, "This action requires a running session.");
    await withMysql(
        async (conn)=>{
            const result = await updateReviewQuery(conn, req.body);
            if(result){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectReviewsByUser(req, res){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    if(!validateProperties(res, req.body, ["userName"])) return false;
    const requester = isUserLogged(req) ? req.session.user.userName : "";
    await withMysql(
        async (conn)=>{
            const reviews = await selectReviewsByUserQuery(conn, req.body.userName, requester, limiter.limit, limiter.offset, req.body.orderby);
            if(reviews){
                return returnData(res, reviews);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectReviewsByMovie(req: any, res: any){
    const limiter = getLimiter(req.body.limit, req.body.offset)
    const requester = isUserLogged(req) ? req.session.user.userName : "";     
    await withMysql(
        async (conn)=>{            
            const result = await selectDetailedReviewsByMovieQuery(conn, req.body.movieId, requester, limiter.limit, limiter.offset, req.body.orderby);
            return returnData(res, result);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectReviewsByUserAndMovie(req:any, res: any){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    if(!validateProperties(res, req.body, ["userName", "movieId"])) return false;
    await withMysql(
        async (conn)=>{
            const review = await selectDetailedReviewByUserAndMovieQuery(conn, req.body.userName, req.body.movieId, limiter.limit, limiter.offset);
            if(review){
                return returnData(res, review);
            }
            return return404(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}