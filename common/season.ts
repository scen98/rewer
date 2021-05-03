import { IDetailedMovie } from "./movie";
export interface ISeason{
    id: number;
    seriesId: number;
    releaseYear?: string;
    episodes: IDetailedMovie[];
    order?: number;
}