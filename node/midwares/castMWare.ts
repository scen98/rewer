import { ICast } from "../../common/cast";
import { deleteCastQuery, insertCastQuery, selectCastTypesQuery, updateCastQuery } from "../models/castQueries";
import { isUserMod, return200, return403, return500, returnData, returnError, validateProperties, withMysql } from "./midutils";

export async function insertCast(req:any, res:any){
    if(!isUserMod(req)) return return403(res, "User permission level 2 or higher is required for this action.");
    if(!validateProperties(res, req.body, ["artistId", "entryId", "castTypeId"])) return false;
    await withMysql(
        async (conn)=>{
            const newId = await insertCastQuery(conn, req.body);
            if(newId){
                return returnData(res, { newId: newId });
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    );
}

export async function insertCasts(req:any, res:any){
    if(!isUserMod(req)) return return403(res, "User permission level 2 or higher is required for this action.");
    await withMysql(
        async (conn)=>{
            const newCasts: ICast[] = req.body.casts;
            for(let cast of newCasts) {
                cast.id = await insertCastQuery(conn, cast);
            }
            if(newCasts.length > 0){
                return returnData(res, newCasts);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    );
}

export async function deleteCast(req:any, res:any){
    if(!isUserMod(req)) return return403(res, "User permission level 2 or higher is required for this action.");
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            const result = await deleteCastQuery(conn, req.body.id);
            if(result){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    );
}

export async function selectCastTypes(req: any, res: any){
    await withMysql(
        async (conn)=>{
            const castTypes = await selectCastTypesQuery(conn);
            if(castTypes){
                return returnData(res, castTypes);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    );
}

export async function updateCast(req:any, res:any){
    if(!isUserMod(req)) return return403(res);
    if(!validateProperties(res, req.body, ["id", "artistId", "movieId", "castTypeId"])) return false;
    await withMysql(
        async (conn)=>{
            const result = await updateCastQuery(conn, req.body);
            if(result){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    );
}