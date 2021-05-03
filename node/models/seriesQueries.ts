import { IDetailedSeries, ISeries } from "../../common/series";
import { selectSeasonsBySeriesQuery } from "./seasonQueries";
import { selectSeriesGenresBySeriesQuery } from "./seriesGenreQueries";

export async function insertSeriesQuery(conn: any, series: ISeries): Promise<number | null>{
    const result = await conn.query("INSERT INTO series (title, summary, trailer) VALUES (?, ?)", [series.title, series.summary, series.trailer]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function updateSeriesQuery(conn:any, series: ISeries): Promise<boolean>{
    const result = await conn.query("UPDATE series SET title = ?, summary = ?, trailer = ? WHERE id = ?", [series.title, series.summary, series.trailer, series.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function deleteSeriesQuery(conn:any, id: number): Promise<boolean>{
    const result = await conn.query("DELETE FROM series WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectSeriesByKeywordQuery(conn:any, keyword: string, limit: number, offset: number){
    const result = await conn.query("SELECT * FROM series WHERE series.title LIKE CONCAT('%',?,'%') LIMIT ? OFFSET ?", [keyword, limit, offset]);
    return result[0];
}

export async function selectDetailedSeriesQuery(conn: any, id: number): Promise<IDetailedSeries>{
    const result = await conn.query("SELECT * FROM series WHERE id = ?", [id]);
    const detailedSeries: IDetailedSeries = result[0][0];
    detailedSeries.seasons = await selectSeasonsBySeriesQuery(conn, id);
    detailedSeries.genres = await selectSeriesGenresBySeriesQuery(conn, id);
  //  detailedSeries.avgScore = getAvgSeriesScore(detailedSeries);
    return detailedSeries;
}

function getAvgSeriesScore(series: ISeries){
    let reviewedEpisodeCount: number = 0;
    let sum: number = 0;
    for(let season of series.seasons) {
        for(let episode of season.episodes) {        
            if(episode.avgScore! > 0){
                sum = sum + episode.avgScore!;
                reviewedEpisodeCount++;
            } 
        }
    }
    return sum / reviewedEpisodeCount;
}