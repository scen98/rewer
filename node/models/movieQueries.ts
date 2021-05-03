import { ICast } from "../../common/cast";
import { IEntryGenre } from "../../common/genre";
import { IDetailedMovie, IMovie } from "../../common/movie";
import { selectCastsByEntriesQuery } from "./castQueries";
import { selectEntryGenresByEntriesQuery } from "./genreQueries";

export async function selectLatestMoviesQuery(conn: any, limit: number, offset: number): Promise<IDetailedMovie[]>{
    const today: string = new Date().toISOString().split('T')[0];  
    const result = await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 1 GROUP BY entries.id ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, limit, offset]);
    return await moviesFactory(conn, result[0]);
}

export async function selectUpcomingMoviesQuery(conn: any, limit: number, offset: number): Promise<IDetailedMovie[]>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate > ? AND entries.type = 1 GROUP BY entries.id ORDER BY entries.releaseDate LIMIT ? OFFSET ?", [today, limit, offset]);
    return await moviesFactory(conn, result[0]);
}

export async function selectDetailedMoviesByScoreQuery(conn: any, min: number, limit: number, offset: number): Promise<IDetailedMovie[]>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 1 GROUP BY entries.id HAVING avgScore >= ? ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, min, limit, offset]);
    return await moviesFactory(conn, result[0]);
}

export async function selectDetailedMoviesBySeasonsQuery(conn: any, seasonIds: number[]): Promise<IDetailedMovie[]>{
    const result = 
    await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore, entries.seasonId FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.seasonId IN (?) GROUP BY entries.id ORDER BY entries.releaseDate DESC", [seasonIds]);
    const detailedMovies = result[0];
    if(detailedMovies.length < 1 || detailedMovies == null){
        return detailedMovies;
    }
    const casts = await selectCastsByEntriesQuery(conn, detailedMovies.map(m=> m.id));
    return mergeMovies(detailedMovies, casts, []);
    //return detailedMovies;
}

export async function selectMoviesByKeywordQuery(conn, keyword: string, limit: number): Promise<IMovie[]>{
    const result = 
    await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.seasonId, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.type = 1 AND entries.title LIKE CONCAT('%',?,'%') GROUP BY entries.id LIMIT ?", 
    [keyword, limit]);
    return result[0];
}

export async function selectLatestMoviesByGenreQuery(conn: any, genreId: number, limit: number, offset: number): Promise<IDetailedMovie[]>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = await conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entryGenres INNER JOIN entries ON entryGenres.entryId = entries.id LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entryGenres.genreId = ? AND entries.type = 1 AND entries.releaseDate <= ? GROUP BY entries.id ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [genreId, today, limit, offset]);
    return await moviesFactory(conn, result[0]);
}

async function moviesFactory(con, detailedMovies: IDetailedMovie[]): Promise<IDetailedMovie[]>{
    if(detailedMovies.length === 0) return []; //no need to waste time for other queries  
    const movieIds: number[] = detailedMovies.map(m=> m.id);
    const casts: ICast[] = await selectCastsByEntriesQuery(con, movieIds);
    const movieGenres: IEntryGenre[] = await selectEntryGenresByEntriesQuery(con, movieIds);   
    return mergeMovies(detailedMovies, casts, movieGenres);
}

export function mergeMovies(detailedMovies: IDetailedMovie[], casts: ICast[], movieGenres: IEntryGenre[]): IDetailedMovie[]{
    return detailedMovies.map(movie=> {
        return {
            ...movie,
            casts: casts.filter(c=> c.entryId === movie.id),
            genres: movieGenres.filter(g=> g.entryId === movie.id),
            avgScore: typeof movie.avgScore === "string" ? parseFloat(movie.avgScore as unknown as string) : null //ts used to scream without unknown so im leaving it for now
        }
    });
}