import { IEntryGenre, IGenre } from "../../common/genre";
import { ISeriesGenre } from "../../common/series";

export async function selectGenresQuery(con: any): Promise<IGenre[]>{
    const result = await con.query('SELECT * FROM genres;');
    return result[0];
}

export async function selectMovieGenresQuery(con: any): Promise<IGenre[]>{
    const result = await con.query('SELECT * FROM genres WHERE movie = true;');
    return result[0];
}

export async function selectGameGenresQuery(con: any): Promise<IGenre[]>{
    const result = await con.query('SELECT * FROM genres WHERE game = true;');
    return result[0];
}

export async function insertEntryGenreQuery(con: any, movieGenre: IEntryGenre): Promise<number | null>{
    const result = await con.query("INSERT INTO entryGenres (entryId, genreId) VALUES (?, ?)", [movieGenre.entryId, movieGenre.genreId]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function deleteEntryGenreQuery(con: any, id: number): Promise<boolean>{
    const result = await con.query("DELETE FROM entryGenres WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function insertSeriesGenreQuery(conn, seriesGenre: ISeriesGenre): Promise<number | null>{
    const result = await conn.query("INSERT INTO seriesGenres (seriesId, genreId) VALUES (?, ?)", [seriesGenre.seriesId, seriesGenre.genreId]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function deleteSeriesGenreQuery(conn, id: number): Promise<boolean>{
    const result = await conn.query("DELETE FROM seriesGenres WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectEntryGenresByEntriesQuery(conn, movieIds: number[]): Promise<IEntryGenre[]>{
    const result = await conn.query("SELECT entryGenres.id as id, entryGenres.genreId, entryGenres.entryId, genres.name as genreName FROM entryGenres INNER JOIN genres on entryGenres.genreId = genres.id WHERE entryGenres.entryId IN (?);", [movieIds]);
    return result[0];
}