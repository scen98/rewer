import { deleteEntryQuery, EEntryType, insertEntryQuery, selectDetailedEntryQuery, updateEntryQuery } from "../models/entryQueries";
import { deleteGamePlatformQuery, insertGamePlatformQuery, selectDetailedGamesQuery, selectGamesByScoreQuery, selectLatestGamesQuery, selectPlatformsQuery } from "../models/gameQueries";
import { checkLength, getLimiter, isUserMod, return200, return403, return500, returnData, returnError, returnInsert, validateProperties, withMysql } from "./midutils";
import { deleteImages } from "./movieMWare";

export async function insertGame(req, res){
    if(!isUserMod(req)) return return403(res);
    if(!validateProperties(res, req.body, ["title"])) return false;
    if(!checkLength(res, req.body.title, 255)) return false;
    if(req.body.trailer != null){
        if(!checkLength(res, req.body.trailer, 1000)) return false;
    }
    await withMysql(async (con)=>{
        const newId = await insertEntryQuery(con, req.body, EEntryType.Game);
        if(newId > 0){
            return returnInsert(res, newId);
        }
        return return500(res);
    },
    (err)=>{
        returnError(res, err);
    });
}

export async function updateGame(req, res){
    if(!validateProperties(res, req.body, ["title"])) return false;
    await withMysql(
        async (conn)=>{       
            const result = await updateEntryQuery(conn, req.body);
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

export async function deleteGame(req, res){
    if(!validateProperties(res, req.body, ["id"])) return false;
    if(req.session == null || req.session.user == null || req.session.user.permission < 2) return return403(res);
    await withMysql(
        async (conn)=>{
            const result = await deleteEntryQuery(conn, req.body.id);
            if(result){
                deleteImages(`${req.body.id}.jpg`);
                return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function insertGamePlatform(req, res){
    if(!validateProperties(res, req.body, ["entryId", "platformId"])) return false;
    if(!isUserMod(req)) return return403(res);
    await withMysql(
        async (con)=>{
            const newId = await insertGamePlatformQuery(con, req.body);
            if(newId != null){
                return returnInsert(res, newId);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function deleteGamePlatform(req, res){
    if(!validateProperties(res, req.body, ["id"])) return false;
    if(!isUserMod(req)) return return403(res);
    await withMysql(
        async (con)=>{
            const success = await deleteGamePlatformQuery(con, req.body.id);
            if(success){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectDetailedGame(req: any, res: any){
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (con)=>{
            const detailedMovies = await selectDetailedGamesQuery(con, [req.body.id]);
            if(detailedMovies.length > 0){
                returnData(res, {...detailedMovies[0], id: req.body.id });
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectGamesByScore(req, res){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    const min = req.body.min == null || req.body.min > 10 ? 5 : req.body.min;
    await withMysql(
        async (conn)=>{
            const games = await selectGamesByScoreQuery(conn, min, limiter);
            if(games){
                return returnData(res, games);
            }
            return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectLatestGames(req: any, res: any){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{            
          const movies = await selectLatestGamesQuery(conn, limiter);
            if(movies){
                return returnData(res, movies);
            }
            return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}


export async function selectPlatforms(req: any, res: any){
    await withMysql(
        async (conn)=>{            
          const platforms = await selectPlatformsQuery(conn);
          if(platforms != null){
              return returnData(res, platforms);
          }
          return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}