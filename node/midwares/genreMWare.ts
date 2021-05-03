import { return500, returnData, returnError, withMysql, return403, returnInsert, return200, isUserMod, validateProperties } from "./midutils";
import { deleteEntryGenreQuery, insertEntryGenreQuery, selectGameGenresQuery, selectGenresQuery, selectMovieGenresQuery } from "../models/genreQueries";
import { deleteSeriesGenreQuery, insertSeriesGenreQuery } from "../models/seriesGenreQueries";

export async function selectGenres(req: any, res: any){
    await withMysql(
        async (conn)=>{
            const genres = await selectGenresQuery(conn);
            if(genres){
                return returnData(res, genres);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function insertEntryGenre(req: any, res: any){
    if(!isUserMod(req)) return return403(res);
    if(!validateProperties(res, req.body, ["entryId", "genreId"])) return false;
    await withMysql(
        async (conn)=>{
            const newId = await insertEntryGenreQuery(conn, req.body);
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

export async function deleteEntryGenre(req: any, res: any){
    if(!isUserMod(req)) return return403(res);
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            const result = await deleteEntryGenreQuery(conn, req.body.id);
            if(result){
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return return500(res, err);
        }
    )
}

export async function insertSeriesGenre(req, res){
    if(!isUserMod(req)) return return403(res, "This action requires permission level of 2 or higher.");
    if(!validateProperties(res, req, ["seriesId", "genreId"])) return false;
    await withMysql(
        async (conn)=>{
            const newId: number = await insertSeriesGenreQuery(conn, req.body);
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

export async function selectMovieGenres(req, res){
    await withMysql(
        async (con)=>{
            const genres = await selectMovieGenresQuery(con);
            return returnData(res, genres);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectGameGenres(req, res){
    await withMysql(
        async (con)=>{
            const genres = await selectGameGenresQuery(con);
            return returnData(res, genres);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export default async function deleteSeriesGenre(req, res){
    if(!isUserMod(req)) return return403(res, "This action requires permission level of 2 or higher.");
    if(!validateProperties(res, req.body, ["id"])) return false;
    await withMysql(
        async (conn)=>{
            const result: boolean = await deleteSeriesGenreQuery(conn, req.body.id);
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