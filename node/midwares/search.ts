import { selectLatestArticlesQuery } from "../models/articleQueries";
import { selectArtistsByKeywordQuery } from "../models/artistQuery";
import { selectUsersByKeywordQuery } from "../models/detailedUserQueries";
import { selectPreviewSeriresByKeywordQuery } from "../models/previewSeries";
import { getLimiter, returnData, returnError, returnMissingRequest, withMysql } from "./midutils";
import { IFilter } from "../../common/search";
import { selectMoviesByKeywordQuery } from "../models/movieQueries";
import { selectGamesByKeywordQuery } from "../models/gameQueries";

export default async function mainSearch(req, res){
    if(req.body.keyword == null) return returnMissingRequest(res, ["keyword"]);
    let filter: IFilter;
    if(req.body.filter == null) {
        filter = { 
            movies: true,
            games: true,
            series: true,
            artists: true,
            articles: true,
            users: true
        };
    } else {
        filter = req.body.filter;
    }
    const limiter = getLimiter(req.body.limit, 0);
    await withMysql( 
        async (conn)=>{ //advenced search engine right here
            const movies = filter.movies === true ? await selectMoviesByKeywordQuery(conn, req.body.keyword, limiter.limit) : [];
            const games =  filter.games === true ? await selectGamesByKeywordQuery(conn, req.body.keyword, limiter.limit) : [];
            const series = filter.series === true ?  await selectPreviewSeriresByKeywordQuery(conn, req.body.keyword, limiter.limit, 0) : [];
            const artists =  filter.artists === true ?  await selectArtistsByKeywordQuery(conn, req.body.keyword, limiter.limit, 0) : [];
            const users =  filter.users === true ?  await selectUsersByKeywordQuery(conn, req.body.keyword, limiter.limit) : [];
            const articles = filter.articles === true ? await selectLatestArticlesQuery(conn, req.body.keyword, limiter.limit, 0) : [];
            return returnData(res, { movies, games, series, artists, users, articles });
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function autoComplete(req, res){
    if(req.body.keyword == null) return returnMissingRequest(res, ["keyword"]);
    let filter: IFilter;
    if(req.body.filter == null){
        filter = {
            movies: true,
            games: true,
            series: true,
            artists: true,
            articles: true,
            users: true
        }
    } else {
        filter = req.body.filter;
    }
    let limiter = getLimiter(req.body.limit, 0);
    await withMysql(
        async (conn)=>{
            const movies = filter.movies === true ? (await selectMoviesByKeywordQuery(conn, req.body.keyword, limiter.limit)).map(m=> m.title) : [];
            const games = filter.games === true ? (await (await selectGamesByKeywordQuery(conn, req.body.keyword, limiter.limit)).map(m=> m.title)) : [];
            const series = filter.series === true ? (await selectPreviewSeriresByKeywordQuery(conn, req.body.keyword, limiter.limit, 0)).map(s=> s.title) : [];
            const artists = filter.artists === true ? (await selectArtistsByKeywordQuery(conn, req.body.keyword, limiter.limit, 0)).map(a=> a.name) : [];
            const users = filter.users === true ?  (await selectUsersByKeywordQuery(conn, req.body.keyword, limiter.limit)).map(u=> u.nickName) : [];
            const articles = filter.articles === true ? (await selectLatestArticlesQuery(conn, req.body.keyword, limiter.limit, 0)).map(a=> a.title) : [];
            return returnData(res, [ ...movies, ...games, ...series, ...artists, ...users, ...articles]);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
    return;
}