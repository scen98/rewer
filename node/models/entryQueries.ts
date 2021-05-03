import { ICast } from "../../common/cast";
import { IEntryGenre } from "../../common/genre";
import { IEntry } from "../../common/movie";
import { IMysqlResult } from "../config/mysqlConnection";
import { selectCastsByEntriesQuery } from "./castQueries";
import { selectEntryGenresByEntriesQuery } from "./genreQueries";

export async function selectDetailedEntryQuery(conn, id: number){
    const result =
    await conn.query("SELECT entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, entries.trailer, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.id = ?", [id]);
    if(result[0].length > 1){
        return null;
    }
    const casts: ICast[] = await selectCastsByEntriesQuery(conn, [id]);
    const movieGenres: IEntryGenre[] = await selectEntryGenresByEntriesQuery(conn, [id]);
    return {...result[0][0], id: id, casts: casts, genres: movieGenres, avgScore: parseFloat(result[0][0].avgScore as unknown as string)}; //so elegant
}

export enum EEntryType{
    Movie = 1,
    Episode = 2,
    Game = 3
}

export async function insertEntryQuery(conn: any, entry: IEntry, entryType: EEntryType): Promise<number | null>{
    const result = 
    await conn.query("INSERT INTO entries (title, releaseDate, summary, runtime, trailer, production, seasonId, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
    [entry.title, entry.releaseDate, entry.summary, entry.runtime, entry.trailer, entry.production, entry.seasonId, entryType]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function updateEntryQuery(conn: any, entry: IEntry): Promise<boolean>{
    const result = 
    await conn.query("UPDATE entries SET title = ?, releaseDate = ?, summary = ?, runtime = ?, production = ?, trailer = ? WHERE id = ?", [entry.title, entry.releaseDate, entry.summary, entry.runtime, entry.production, entry.trailer, entry.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function deleteEntryQuery(conn: any, id: number): Promise<boolean>{
    const result: IMysqlResult = 
    await conn.query("DELETE FROM entries WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectPreviewEntriesBySeries(conn, seriesIds: number[]): Promise<IEntryPreview[]> {
    const result = await conn.query("SELECT seasons.seriesId, entries.id, entries.title, entries.releaseDate FROM entries JOIN seasons ON entries.seasonId = seasons.id WHERE seasons.seriesId IN (?) ORDER BY entries.releaseDate DESC, entries.id DESC", [seriesIds]);
    return result[0];
}

interface IEntryPreview{
    id: number;
    title: string;
    releaseDate: string;
    seriesId: number;
}