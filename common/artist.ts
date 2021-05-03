import { IEntryCast, ISeriesCast } from "./cast";
export interface IArtist{
    id: number;
    name: string;
    birthPlace: string;
    birthDate: string;
    deathPlace: string;
    deathDate: string;
    bio: string;
}

export interface IDetailedArtist extends IArtist{
    entryCasts: IEntryCast[];
    seriesCasts: ISeriesCast[];
}