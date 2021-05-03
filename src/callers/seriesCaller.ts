import { ICast, ISeriesCast } from "../../common/cast";
import { IMovie } from "../../common/movie";
import { ISeason } from "../../common/season";
import { IDetailedSeries, IPreviewSeries, ISeries, ISeriesGenre } from "../../common/series";
import { POSTAsynch, UploadFile } from "./caller";
import { compareCastType } from "./castCaller";
import { compareMovieGenresByName } from "./movieCaller";

export const seriesPath = {
    insertSeries:"/series/insert_series",
    updateSeries: "/series/update_series",
    uploadSeriesPoster: "/series/upload_series_poster",
    selectDetailedSeries: "/series/select_detailed_series",
    selectLatestPreviewSeries: "/series/select_latest_preview_series",
    insertSeriesGenre: "/genre/insert_series_genre",
    deleteSeriesGenre: "/genre/delete_series_genre",
    insertEpisode: "/series/insert_episode",
    deleteSeries: "/series/delete_series"
}

export async function uploadSeriesPoster(file: FormData): Promise<boolean>{
    const response = await UploadFile("/series/upload_series_poster", file);
    if(response.ok){
        return true;
    }
    return false;
}

export function selectDetailedSeriesPostFetch(detailedSeries: IDetailedSeries){
    detailedSeries.genres.sort(compareMovieGenresByName);
    orderCasts(detailedSeries);
    for(let season of detailedSeries.seasons) {
        season.episodes.sort(compareEpisodes);
    }
}

export async function selectLatestPreviewSeries(limit: number, offset: number): Promise<IPreviewSeries[] | null >{
    const response = await POSTAsynch("/series/select_latest_preview_series", { limit: limit, offset: offset});
    if(response.ok){
        return await response.json();
    }
    return null;
}

export async function insertSeriesGenre(seriesGenre: ISeriesGenre): Promise<number | null>{
    const response = await POSTAsynch("genre/insert_series_genre", seriesGenre);
    if(response.ok){
        return (await response.json()).newId;
    }
    return null;
}

export async function deleteSeriesGenre(id: number): Promise<boolean>{
    const response = await POSTAsynch("genre/delete_series_genre", { id: id});
    if(response.ok){
        return true;
    }
    return false;
}

export function getSeasonCount(series: ISeries): number{
    return series.seasons.filter(s=> s.episodes.length > 0).length;
}

export function getEpisodeCount(series: ISeries): number{
    let sum: number = 0;
    series.seasons.forEach(season => {
        sum += season.episodes.length;
    });
    return sum;
}


export function getFirstEpisodeDate(series: ISeries): string{
    if(series.seasons.length > 0 && series.seasons[0].episodes.length > 0){
        return series.seasons[0].episodes[0].releaseDate;
    } else {
        return null;
    }
}

export function getAvgRuntime(series: ISeries): number{
    let epCount: number = getEpisodeCount(series);
    let sum: number = 0;
    for(let season of series.seasons) {
        for(let episode of season.episodes) {
            if(episode.runtime > 0) sum += episode.runtime;
        }
    }
    return sum / epCount;
}

export function getSeriesCast(series: ISeries): ISeriesCast[]{
    let seriesCast: ISeriesCast[] = [];
    for(let season of series.seasons) {
        setSeriesCastFromSeason(season, seriesCast);
    }
    return seriesCast;
}

function compareSeriesCastByEpisodeCount(scast1: ISeriesCast, scast2: ISeriesCast){
    if(scast1.episodeCount > scast2.episodeCount){
        return -1;
    }
    if(scast1.episodeCount < scast2.episodeCount){
        return 1;
    }
    return 0;
}

export function getAvgSeriesScore(series: ISeries){
    let reviewedEpisodeCount: number = 0;
    let sum: number = 0;
    for(let season of series.seasons) {
        for(let episode of season.episodes) {
            if(episode.avgScore > 0){
                sum = sum + episode.avgScore;
                reviewedEpisodeCount++;
            } 
        }
    }
    return sum / reviewedEpisodeCount;
}

function setSeriesCastFromSeason(season: ISeason, seriesCast: ISeriesCast[]){
    for(let episode of season.episodes) {
        setSeriesCastFromEpisode(episode, seriesCast);
    }
}

function setSeriesCastFromEpisode(episode: IMovie, seriesCast: ISeriesCast[]){
    for(let cast of episode.casts) {
        setSeriesCastFromCast(cast, seriesCast);
    }
}

function setSeriesCastFromCast(cast: ICast, seriesCast: any[]){
    let sc: ISeriesCast = seriesCast.find(a=> a.artistId === cast.artistId);
    if(sc != null){
        handleExistingSeriesCast(cast, sc);
    } else {
        seriesCast.push({ 
            artistId: cast.artistId, 
            artistName: cast.artistName, 
            episodeCount: 1, 
            characterNames: [cast.name], 
            castTypeId: cast.castTypeId } );
    }
}

function handleExistingSeriesCast(cast: ICast, sc: any){
     let updatedNames = sc.characterNames;
     if(sc.characterNames.filter(a=> a === cast.name).length === 0){
         updatedNames.push(cast.name);
     }
     sc = {...sc, episodeCount: sc.episodeCount++, characterNames: updatedNames };
}

function orderCasts(series: ISeries){
    for(let season of series.seasons) {
        orderSeasonCast(season);
    }
}

function orderSeasonCast(seasons: ISeason){
    for(let episode of seasons.episodes) {
            episode.casts.sort(compareCastType);
    }
}

export function compareEpisodes(episode1: IMovie, episode2: IMovie){
    if(new Date(episode1.releaseDate) > new Date(episode2.releaseDate)){
        return 1;
    }
    if(new Date(episode1.releaseDate) < new Date(episode2.releaseDate)){
        return -1;
    }
    if(episode1.releaseDate === episode2.releaseDate){
        if(episode1.id > episode2.id) return 1;
        if(episode1.id < episode2.id) return -1;
    }
    return 0;
}


