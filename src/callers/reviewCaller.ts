import { IReview } from "../../common/review";

export const reviewPath = {
    selectMyReview: "/review/select_review_by_user_and_movie",
    selectReviewsByMovie: "/review/select_reviews_by_movie",
    selectFollowedReviews: "/review/select_followed_reviews",
    selectReviewsByUser: "/review/select_reviews_by_user",
    insertReview: "/review/insert_review",
    deleteReview: "/review/delete_review",
    updateReview: "/review/update_review",
    insertReviewLike: "/review/insert_reviewlike",
    updateReviewLike: "/review/update_reviewlike",
    selectReviewByUserAndMovie: "/review/select_review_by_user_and_movie"
}

export enum EReviewOrderBy{
    popIndex = "popIndex",
    date = "date"
}

export function linkSrc(review: IReview){
    if(review.entryType === 3){
        return `/rewer/game?gameId=${review.entryId}`
    }
    return `/rewer/movie?movieId=${review.entryId}`;
}