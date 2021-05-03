import { ICast } from "../../common/cast";
import { IDetailedGame, IGame, IGamePlatform } from "../../common/game"
import { IEntryGenre } from "../../common/genre";
import { ILimiter } from "../midwares/midutils";
import { selectCastsByEntriesQuery } from "./castQueries";
import { selectEntryGenresByEntriesQuery } from "./genreQueries";


export async function selectDetailedGamesQuery(con, ids: number[]){
    const result =
    await con.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, entries.trailer, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.id IN (?)", [ids]);
    return await gamesFactory(con, result[0]);
}

export async function selectGamesByScoreQuery(con, min: number, limiter: ILimiter): Promise<IDetailedGame[]>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = await con.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.production, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 3 GROUP BY entries.id HAVING avgScore >= ? ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, min, limiter.limit, limiter.offset]);
    return await gamesFactory(con, result[0]);
}

export async function selectGamesByKeywordQuery(conn, keyword: string, limit: number): Promise<IGame[]>{
    const result = 
    await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.type = 3 AND entries.title LIKE CONCAT('%',?,'%') GROUP BY entries.id LIMIT ?", 
    [keyword, limit]);
    return result[0];
}

export async function selectLatestGamesQuery(conn: any, limiter: ILimiter): Promise<IDetailedGame[]>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 3 GROUP BY entries.id ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, limiter.limit, limiter.offset]);
    return await gamesFactory(conn, result[0]);
}

export async function selectUpcomingGamesQuery(conn, limiter: ILimiter): Promise<IDetailedGame[]>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate > ? AND entries.type = 1 GROUP BY entries.id ORDER BY entries.releaseDate LIMIT ? OFFSET ?", [today, limiter.limit, limiter.offset]);
    return await gamesFactory(conn, result[0]);
}

export async function selectGamePlatforms(con, gameIds: number[]): Promise<IGamePlatform[]>{
    const result = await con.query("SELECT gamePlatforms.id as id, gamePlatforms.entryId, gamePlatforms.platformId, platforms.name as platformName FROM gamePlatforms JOIN platforms ON platforms.id = gamePlatforms.platformId WHERE gamePlatforms.entryId IN (?);", [gameIds]);
    return result[0];
}

export async function insertGamePlatformQuery(con, gamePlatform: IGamePlatform){
    const result = await con.query("INSERT INTO gamePlatforms (entryId, platformId) VALUES (?, ?);", [gamePlatform.entryId, gamePlatform.platformId]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function deleteGamePlatformQuery(con, id: number){
    const result = await con.query("DELETE FROM gamePlatforms WHERE id = ?;", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectPlatformsQuery(con){
    const result = await con.query("SELECT * FROM platforms");
    return result[0];
}

async function gamesFactory(conn, games: IDetailedGame[]): Promise<IDetailedGame[]>{
    if(games.length === 0) return [];

    const gameIds = games.map(m=> m.id);
    const casts: ICast[] = await selectCastsByEntriesQuery(conn, gameIds);
    const gameGenres: IEntryGenre[] = await selectEntryGenresByEntriesQuery(conn, gameIds);
    const gamePlatforms = await selectGamePlatforms(conn, gameIds); 
    return mergeGames(games, casts, gameGenres, gamePlatforms);
}

export function mergeGames(detailedGames: IDetailedGame[], casts: ICast[], gameGenres: IEntryGenre[], gamePlatforms: IGamePlatform[]): IDetailedGame[]{
    return detailedGames.map(game=> {
        return {
            ...game,
            casts: casts.filter(c=> c.entryId === game.id),
            genres: gameGenres.filter(g=> g.entryId === game.id),
            platforms: gamePlatforms.filter(p=> p.entryId === game.id),
            avgScore: typeof game.avgScore === "string" ? parseFloat(game.avgScore as unknown as string) : null //ts used to scream without unknown so im leaving it for now
        }
    });
}