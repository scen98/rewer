import { IMovie } from "./movie";
import { ISeries } from "./series";
import { IDetailedUser } from "./user";
import { IArtist } from "./artist";
import { IArticle } from "./article";
import { IGame } from "./game";
export interface ISearchResult{
    movies: IMovie[];
    games: IGame[];
    series: ISeries[];
    users: IDetailedUser[];
    artists: IArtist[];
    articles: IArticle[];
}

export interface IFilter{
    movies: boolean;
    games: boolean;
    series: boolean;
    users: boolean;
    artists: boolean;
    articles: boolean;
}

export interface IAutoComplete{
    id: number |string;
    name: string;
    date?: string;
    type: string;
}