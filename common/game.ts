import { ICast } from "./cast";
import { IEntryGenre } from "./genre";
import { IEntry } from "./movie";

export interface IGame extends IEntry{
    genres: IEntryGenre[];
    casts?: ICast[];
    platforms: IGamePlatform[];
    avgScore?: number;
}

export interface IDetailedGame extends IGame{
    casts: ICast[];
}

export interface IPlatfrom{
    id: number;
    name: string;
}

export interface IGamePlatform{
    id: number;
    entryId: number;
    platformId: number;
    platformName: string;
}