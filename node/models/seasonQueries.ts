import { IDetailedMovie } from "../../common/movie";
import { ISeason } from "../../common/season";
import { selectDetailedMoviesBySeasonsQuery } from "./movieQueries";

export async function insertSeasonQuery(conn, season: ISeason): Promise<number | null>{
    const result = await conn.query("INSERT INTO seasons (seriesId, releaseYear) VALUES (?, ?)", [season.seriesId, season.releaseYear]);
    if(result[0].insertId){
        return result[0].insertId;
    }
    return null;
}

export async function deleteSeasonQuery(conn, id: number): Promise<boolean>{
    const result = await conn.query("DELETE FROM seasons WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectSeasonsBySeriesQuery(conn:any, seriesId: number): Promise<ISeason[]>{
    let seasons: ISeason[] = [];
    let detailedMovies: IDetailedMovie[] = [];
    let result = await conn.query("SELECT * FROM seasons WHERE seriesId = ?", [seriesId]);
    seasons = result[0];

    detailedMovies = await selectDetailedMoviesBySeasonsQuery(conn, seasons.map(s=> s.id));

    seasons = mergeSeasons(seasons, detailedMovies);
    addOrders(seasons);
    return seasons;
}

export function mergeSeasons(seasons: ISeason[], movies: IDetailedMovie[]): ISeason[]{
    return seasons.map(season=>{
        return {
            ...season,
            episodes: movies.filter(m=> m.seasonId === season.id)
        }
    });
}

export function addOrders(seasons: ISeason[]){
    let i: number;
    for (i = 0; i < seasons.length; i++) {
        seasons[i].order = i+1;
    }
}