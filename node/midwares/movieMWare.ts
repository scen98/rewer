import { selectDetailedMoviesByScoreQuery, selectLatestMoviesByGenreQuery, selectLatestMoviesQuery, selectUpcomingMoviesQuery } from "../models/movieQueries";
import { deleteEntryQuery, EEntryType, insertEntryQuery, selectDetailedEntryQuery, updateEntryQuery } from "../models/entryQueries";
import { getLimiter, isUserMod, return200, return403, return500, returnData, returnError, returnInsert, returnMissingRequest, validateProperties, withMysql } from "./midutils";

export async function insertMovie(req: any, res: any){
    if(!isUserMod(req)) return return403(res);
    if(req.body.title == null) return returnMissingRequest(res, ["title"]);
    await withMysql(
        async (conn)=>{
            const newId = await insertEntryQuery(conn, req.body, EEntryType.Movie);
            if(newId) return returnInsert(res, newId);
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function updateMovie(req: any, res: any){
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

export async function deleteMovie(req: any, res: any){
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

export async function deleteImages(fileName: string){
    const fs = require('fs');
    fs.unlink(`${__dirname}/../uploads/posters/${fileName}`, ()=>{ });
    fs.unlink(`${__dirname}/../uploads/posters/small-${fileName}`, ()=>{ });
    fs.unlink(`${__dirname}/../uploads/posters/medium-${fileName}`, ()=>{ });
}

export async function selectUpcomingMovies(req: any, res: any){
    let limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{          
            const movies = await selectUpcomingMoviesQuery(conn, limiter.limit, limiter.offset);
            if(movies){
                return returnData(res, movies);
            }
            return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    );
}

export async function selectMoviesByScore(req: any, res: any){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    const min = req.body.min == null || req.body.min > 10 ? 5 : req.body.min;
    await withMysql(
        async (conn)=>{
            const movies = await selectDetailedMoviesByScoreQuery(conn, min, limiter.limit, limiter.offset);
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

export async function selectLatestMoviesByGenre(req: any, res: any){
    if(!validateProperties(res, req.body, ["genreId"])) return false;
    const limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{
            
            const movies = await selectLatestMoviesByGenreQuery(conn, req.body.genreId, limiter.limit, limiter.offset);
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

export async function selectLatestMovies(req: any, res: any){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{
          const movies = await selectLatestMoviesQuery(conn, limiter.limit, limiter.offset);
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

export default async function selectDetailedMovie(req: any, res: any){
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            const detailedMovie = await selectDetailedEntryQuery(conn, req.body.id);
            if(detailedMovie){
                returnData(res, detailedMovie);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}