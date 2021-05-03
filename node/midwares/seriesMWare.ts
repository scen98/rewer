import { EEntryType, insertEntryQuery } from "../models/entryQueries";
import { selectLatestPreviewSeriesQuery } from "../models/previewSeries";
import { deleteSeriesQuery, insertSeriesQuery, selectDetailedSeriesQuery, updateSeriesQuery } from "../models/seriesQueries";
import { getLimiter, isUserMod, return200, return403, return500, returnData, returnError, returnInsert, returnMissingRequest, validateProperties, withMysql } from "./midutils";

export async function insertSeries(req, res){
    if(!isUserMod(req)) return return403(res, "Permission level 2 or higher is required for this action.");
    if(!validateProperties(res, req.body, ["title"])) return false;
    await withMysql(
        async (conn)=>{
            const newId = await insertSeriesQuery(conn, req.body);
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

export async function insertEpisode(req, res){
    if(!isUserMod(req)) return return403(res, "Permission level 2 or higher is required for this action.");
    if(!validateProperties(res, req.body, ["title"])) return false;
    await withMysql(
        async (conn)=>{
            const newId = await insertEntryQuery(conn, req.body, EEntryType.Episode);
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

export async function updateSeries(req, res){
    if(!isUserMod(req)) return return403(res, "Permission level 2 or higher is required for this action.");
    if(req.body.id == null) return returnMissingRequest(res, ["id"]);
    await withMysql(
        async (conn)=>{
            const result = await updateSeriesQuery(conn, req.body);
            if(result){
                return return200(res, `Series with id ${req.body.id} was updated successfully.`);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function deleteSeries(req, res){
    if(!isUserMod(req)) return return403(res, "Permission level 2 or higher is required for this action.");
    if(req.body.id == null) return returnMissingRequest(res, ["id"]);
    await withMysql(
        async (conn)=>{
            const result = await deleteSeriesQuery(conn, req.body.id);
            if(result){
                return return200(res, `Series with id ${req.body.id} was updated successfully.`);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectDetailedSeries(req: any, res: any){ 
    if(req.body.id == null) return returnMissingRequest(res, ["id"]);
    await withMysql(
        async (conn)=>{
            const result = await selectDetailedSeriesQuery(conn, req.body.id);
            if(result){
                return returnData(res, result);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export default async function selectLatestPreviewSeries(req, res){ 
    const limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{
            const result = await selectLatestPreviewSeriesQuery(conn, limiter.limit, limiter.offset);
            if(result){
                return returnData(res, result);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}