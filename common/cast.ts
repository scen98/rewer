export interface ICast{
    id: number;
    entryId: number;
    artistId: number;
    castTypeId: number;
    name: string;
    entryTitle?: string;
    artistName?: string;
}

export interface IEntryCast extends ICast{
    entryId: number;
    entryTitle: string;
    entryDate: string;
    castTypeName?: string;
    entryType: number;
}

export interface ISeriesCast extends ICast{
    seriesId: number;
    seriesTitle: string;
    firstEpisodeDate: string;
    castTypeName?: string;
    episodeCount?: number;
}

export interface IArtistCast{
    id: number;
    artistId: number;
    entryId: number;
    castTypeId: number;
    name: string;
    entryTitle: string;
    entryDate: string;
    castTypeName: string;
    seriesId: number;
    seriesTitle: string;
}

export interface ICastType {
    value: number;
    name: string;
}

export interface WInsertCastsRequest{
    casts: ICast[];
}