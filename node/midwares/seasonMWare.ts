import { selectDetailedMoviesBySeasonsQuery } from "../models/movieQueries";
import { deleteSeasonQuery, insertSeasonQuery } from "../models/seasonQueries";
import { isUserMod, return200, return403, return500, returnError, returnInsert, returnMissingRequest, withMysql } from "./midutils";
import { deleteImages } from "./movieMWare";

export async function insertSeason(req: any, res: any){
    if(!isUserMod(req)) return return403(res, "This action requires a running session.");
    if(req.body.seriesId == null) return returnMissingRequest(res, ["seriesId"]);
    await withMysql(
        async (conn)=>{
            const newId = await insertSeasonQuery(conn, req.body);
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

export async function deleteSeason(req: any, res: any){
    if(!isUserMod(req)) return return403(res, "This action requires a running session.");
    if(req.body.id == null) return returnMissingRequest(res, ["id"]);
    await withMysql(
        async (conn)=>{
            const episodes = await selectDetailedMoviesBySeasonsQuery(conn, [req.body.id]);
            const result = await deleteSeasonQuery(conn, req.body.id);
            if(result){
                for(let episode of episodes) {
                    deleteImages(`${episode.id}.jpg`);
                }
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}