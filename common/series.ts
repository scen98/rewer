import { ISeason } from "./season";

export interface ISeries{
    id: number;
    title: string;
    summary: string;
    seasons: ISeason[];
    avgScore: number;
    genres: ISeriesGenre[];
    trailer?: string;
}

export interface ISeriesGenre{
    id: number;
    seriesId: number;
    genreId: number;
    genreName: string;
}

export interface IDetailedSeries extends ISeries{
    seasons: ISeason[];
}

export interface IPreviewSeries{
    id: number;
    title: string;
    avgScore: number;
    summary: string;
    lastEpisodeId: number;
    lastEpisodeTitle: string;
}