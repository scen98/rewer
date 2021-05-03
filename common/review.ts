import { IReviewLike } from "./reviewLike";

export interface IReview{
    id: number;
    entryId: number;
    userName: string;
    text: string;
    score: number;
    date: string;
    popIndex: number;
    nickName?: string;
    myLike?: IReviewLike;
    seriesId?: number; 
    seriesTitle?: string;
    entryTitle?: string;
    entryType?: number;
}

export enum EReviewOrderBy{
    popIndex = "popIndex",
    date = "date"
}

export interface WSelectReviewsByMovieRequest{
    entryId: number;
    limit: number;
    offset: number;
    orderby: EReviewOrderBy;
}