import { getLimiter, isUserMod, return200, return403, return500, returnData, returnError, returnInsert, validateProperties, withMysql } from "./midutils";
import { deleteArtistQuery, insertArtistQuery, selectArtistsByKeywordQuery, selectDetailedArtistQuery, updateArtistQuery } from "../models/artistQuery";

export async function insertArtist(req, res){
    if(!isUserMod(req)) return return403(res, "This action requires permission level of 2 or higher.");
    await withMysql(
        async (conn)=>{
            const newId = await insertArtistQuery(conn, req.body);
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

export async function selectArtistsByKeyword(req, res){
    const search = req.body.keyword != null ? req.body.keyword : "";
    const limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{
            const artists = await selectArtistsByKeywordQuery(conn, search, limiter.limit, limiter.offset);
            if(artists){
                return returnData(res, artists);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectDetailedArtist(req, res){
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            const artist = await selectDetailedArtistQuery(conn, req.body.id);
            if(artist) return returnData(res, artist);
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export default async function updateArtist(req, res){
    if(!isUserMod(req)) return return403(res, "This action requires permission level of 2 or higher.");
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            if(await updateArtistQuery(conn, req.body)){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function deleteArtist(req, res){
    if(!isUserMod(req)) return return403(res, "This action requires permission level of 2 or higher.");
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            if(await deleteArtistQuery(conn, req.body)){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}