export interface IGenre{
    id: number;
    name: string;
}

export interface IEntryGenre{
    id: number;
    entryId: number;
    genreId: number;
    genreName: string;
}

export interface ISeriesGenre{
    id: number;
    seriesId: number;
    genreId: number;
    genreName: string;
}
