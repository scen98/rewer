import { IArticle } from "../../common/article";
import { selectArticlesByUserQuery, insertArticleQuery, deleteArticleQuery, updateArticleQuery, selectLatestArticlesQuery } from "../models/articleQueries";
import { getLimiter, isUserLogged, isUserMod, return200, return403, return500, returnData, returnError, returnInsert, validateProperties, withMysql } from "./midutils";

export async function insertArticle(req, res){
    if(!validateProperties(res, req.body, ["userName"])) return false;
    if(req.session.user == null || req.session.user.userName !== req.body.userName) return return403(res, "Usernames do not match.");
    if(!isUserMod(req)) return return403(res, "Adding articles requires user permission level 2 or higher.");
    await withMysql(
        async (conn)=>{
            const newId = await insertArticleQuery(conn, req.body);
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

export async function updateArticle(req, res){
    if(!validateProperties(res, req.body, ["id", "userName"])) return false;
    if(!isUserLogged(req)) return return403(res, "No running session.");
    if(!isUserMod(req)) return return403(res, "You have no permission to delete this article.");
    await withMysql(
        async (conn)=>{
            const result = await updateArticleQuery(conn, req.body);
            if(result) return return200(res);
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function deleteArticle(req, res){
    if(!validateProperties(res, req.body, ["id", "userName"])) return false;
    if(!isUserMod(req)) return return403(res, "You have no permission to delete this article.");
    await withMysql(
        async (conn)=>{
            const result = await deleteArticleQuery(conn, req.body.id, req.body.userName);
            if(result){
                deleteArticleImages(`${req.body.id}.jpg`);
                return return200(res);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function deleteArticleImages(fileName: string){
    const fs = require('fs');
    fs.unlink(`${__dirname}/../uploads/articles/${fileName}`, ()=>{ });
    fs.unlink(`${__dirname}/../uploads/articles/small-${fileName}`, ()=>{ });
    fs.unlink(`${__dirname}/../uploads/articles/medium-${fileName}`, ()=>{ });
}

export async function selectArticlesByUser(req, res){
    if(!validateProperties(res, req.body, ["userName"])) return false;
    const keyword = req.body.keyword != null ? req.body.keyword : "";
    const limiter = getLimiter(req.body.limit, req.body.offset);
    await withMysql(
        async (conn)=>{
            const articles = await selectArticlesByUserQuery(conn, req.body.userName, keyword, limiter.limit, limiter.offset);
            return returnData(res, articles);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectLatestArticles(req, res){
    const limiter = getLimiter(req.body.limit, req.body.offset);
    const keyword = req.body.keyword != null ? req.body.keyword : "";
    await withMysql(
        async (conn)=>{
            const articles: IArticle[] = await selectLatestArticlesQuery(conn, keyword, limiter.limit, limiter.offset);
            return returnData(res, articles);
        },
        (err)=>{
            return returnError(res, err);
        }
    )
}