import { deleteFollowQuery, insertFollowQuery, selectFollowQuery } from "../models/followQueries";
import { isUserLogged, return200, return403, return404, return500, returnError, returnInsert, validateProperties, withMysql } from "./midutils";

export async function insertFollow(req, res){
    if(!isUserLogged(req)) return return403(res, "No running session.");
    if(!validateProperties(res, req.body, ["follower", "followed"])) return false;
    if(req.session.user.userName !== req.body.follower) return return403(res, "Access denied to other user's follow request.");
    await withMysql(
        async (conn)=>{
            const newId = await insertFollowQuery(conn, req.body);
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

export async function deleteFollow(req, res){
    if(!isUserLogged(req)) return return403(res, "No running session.");    
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            const follow = await selectFollowQuery(conn, req.body.id);
            if(follow == null) return return404(res, "Follow record not found");
            if(follow.follower !== req.session.user.userName) return return403(res, "Access denied to other user's unfollow request.");
            const result = await deleteFollowQuery(conn, req.body.id);
            if(result) return return200(res);
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}