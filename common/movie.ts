import { ICast } from "./cast";
import { IEntryGenre } from "./genre";

export interface IEntry{
    id: number;
    title: string;
    releaseDate: string;
    summary: string;
    runtime?: number;
    production?: string;
    trailer?: string;
    seasonId?: number;
}

export interface IMovie extends IEntry{
    genres: IEntryGenre[];
    casts?: ICast[];
    avgScore?: number;
}

export interface IDetailedMovie extends IMovie{
    casts: ICast[];
}

export interface WSelectMoviesByScoreRequest{
    min: number;
    limit: number;
    offset: number;
}