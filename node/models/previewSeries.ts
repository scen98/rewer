import { IPreviewSeries } from "../../common/series";
import { selectPreviewEntriesBySeries } from "./entryQueries";

interface IPreviewQuery{
    id: number;
    title: string;
    avgScore: string;
    summary: string;
}

export async function selectLatestPreviewSeriesQuery(conn, limit: number, offset: number): Promise<IPreviewSeries[] | null>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = 
    await conn.query("SELECT series.id, series.title, AVG(m.avgScore) as avgScore, series.summary FROM series INNER JOIN seasons ON seasons.seriesId = series.id INNER JOIN (SELECT AVG(reviews.score) as avgScore, entries.seasonId, entries.releaseDate, entries.id FROM entries LEFT JOIN reviews ON entries.id = reviews.entryId WHERE entries.seasonId IS NOT NULL AND entries.releaseDate <= ? GROUP BY entries.id) AS m ON seasons.id = m.seasonId GROUP BY series.id ORDER BY MAX(m.releaseDate) LIMIT ? OFFSET ?",
    [today, limit, offset]);
    const series: IPreviewQuery[] = result[0];  
    if(!series){
        return null;
        
    }
    const entries = await selectPreviewEntriesBySeries(conn, series.map(s=> s.id));
    return series.map(s=> {
        const lastEpisode = entries.find(e=> s.id === e.seriesId);
        return {
            ...s,
            avgScore: parseFloat(s.avgScore as unknown as string),
            lastEpisodeId: lastEpisode.id,
            lastEpisodeTitle: lastEpisode.title,            
        }
    });
}

export async function selectPreviewSeriesByGenreQuery(conn, keyword: string, genreId: number, limit: number, offset: number): Promise<IPreviewSeries[] | null>{
    const result = 
    await conn.query("SELECT series.id, series.title, AVG(m.avgScore) as avgScore, MAX(m.releaseDate) as lastDate, series.summary, m.id as lastEpisodeId, m.title as lastEpisodeTitle FROM series INNER JOIN seasons ON seasons.seriesId = series.id INNER JOIN (SELECT AVG(reviews.score) as avgScore, entries.seasonId, entries.title, entries.releaseDate, entries.id FROM entries LEFT JOIN reviews ON entries.id = reviews.entryId WHERE entries.seasonId IS NOT NULL AND entries.releaseDate <= ? GROUP BY entries.id ORDER BY entries.releaseDate DESC, entries.id DESC) AS m ON seasons.id = m.seasonId GROUP BY series.id ORDER BY MAX(m.releaseDate) LIMIT ? OFFSET ?",
    [genreId, keyword, limit, offset]);
    const series: IPreviewQuery[] = result[0];  
    if(!series){
        return null;
        
    }
    const entries = await selectPreviewEntriesBySeries(conn, series.map(s=> s.id));
    return series.map(s=> {
        const lastEpisode = entries.find(e=> s.id === e.seriesId);
        return {
            ...s,
            avgScore: parseFloat(s.avgScore as unknown as string),
            lastEpisodeId: lastEpisode.id,
            lastEpisodeTitle: lastEpisode.title,            
        }
    });
}

export async function selectPreviewSeriresByKeywordQuery(conn, keyword: string, limit: number, offset: number): Promise<IPreviewSeries[] | null>{
    const result = 
    await conn.query("SELECT series.id, series.title, AVG(m.avgScore) as avgScore, MAX(m.releaseDate) as lastDate, series.summary, m.id as lastEpisodeId, m.title as lastEpisodeTitle FROM series LEFT OUTER JOIN seriesGenres ON series.id = seriesGenres.seriesId INNER JOIN seasons ON seasons.seriesId = series.id INNER JOIN (SELECT AVG(reviews.score) as avgScore, entries.seasonId, entries.title, entries.releaseDate, entries.id FROM entries LEFT JOIN reviews ON entries.id = reviews.entryId WHERE entries.seasonId IS NOT NULL GROUP BY entries.id ORDER BY entries.releaseDate DESC, entries.id DESC) AS m ON seasons.id = m.seasonId WHERE series.title LIKE CONCAT('%',?,'%') GROUP BY series.id ORDER BY MAX(m.releaseDate) LIMIT ? OFFSET ?",
    [keyword, limit, offset]);
    const series: IPreviewQuery[] = result[0];  
    if(!series){
        return null;
        
    }
    const entries = await selectPreviewEntriesBySeries(conn, series.map(s=> s.id));
    return series.map(s=> {
        const lastEpisode = entries.find(e=> s.id === e.seriesId);
        return {
            ...s,
            avgScore: parseFloat(s.avgScore as unknown as string),
            lastEpisodeId: lastEpisode.id,
            lastEpisodeTitle: lastEpisode.title,            
        }
    });
}
