import { ISeriesGenre } from "../../common/genre";

export async function insertSeriesGenreQuery(con: any, seriesGenre: ISeriesGenre): Promise<number | null>{
    const result = await con.query("INSERT INTO seriesGenres (seriesId, genreId) VALUES (?, ?)", [seriesGenre.seriesId, seriesGenre.genreId]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function selectSeriesGenresBySeriesQuery(con: any, seriesId: number): Promise<ISeriesGenre[]>{
    const result = await con.query("SELECT seriesGenres.id, seriesGenres.genreId, genres.name as genreName FROM seriesGenres INNER JOIN genres on seriesGenres.genreId = genres.id WHERE seriesGenres.seriesId = ?;", [seriesId]);
    return result[0];
}

export async function deleteSeriesGenreQuery(con: any, id: number): Promise<boolean>{
    const result = await con.query("DELETE FROM seriesGenres WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}