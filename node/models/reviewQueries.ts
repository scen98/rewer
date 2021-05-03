import { EReviewOrderBy, IReview } from "../../common/review";
import { IReviewLike } from "../../common/reviewLike";
import { selectReviewLikesByReviewsQuery } from "./reviewLikeQueries";

export async function insertReviewQuery(conn: any, review: IReview): Promise<number | null >{
    const result = 
    await conn.query("INSERT INTO reviews (entryId, userName, text, score, date) VALUES (?, ?, ?, ?, ?)", [review.entryId, review.userName, review.text, review.score, review.date]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function updateReviewQuery(conn: any, review: IReview): Promise<boolean>{
    const result = 
    await conn.query("UPDATE reviews SET text = ?, score = ? WHERE id = ?", [review.text, review.score, review.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectReviewQuery(conn, id: number): Promise<IReview>{
    const result = await conn.query("SELECT * FROM reviews WHERE id = ?");
    return result[0][0];
}

export async function deleteReviewQuery(conn: any, id: number): Promise<boolean>{
    const result = 
    await conn.query("DELETE FROM reviews WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function doesReviewExistQuery(conn:any, review: IReview): Promise<boolean>{
    const result = 
    await conn.query("SELECT COUNT(id) as reviewCount FROM reviews WHERE userName = ? AND entryId = ?", [review.userName, review.entryId]);
    if(result[0].length < 1){
        return false;
    }
    if(result[0][0].reviewCount > 0){
        return true;
    }
    return false;
}

export async function selectDetailedReviewsByMovieQuery(conn: any, movieId: number, requester: string, limit: number, offset: number, orderby: EReviewOrderBy){
    let order = "reviews.date";
    if(orderby === EReviewOrderBy.popIndex){
        order = "SUM(reviewLikes.value)";
    }
    const result = 
    await conn.query("SELECT reviews.id, reviews.userName, reviews.text, reviews.date, reviews.score, users.nickName, SUM(reviewLikes.value) as popIndex FROM reviews LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId INNER JOIN users ON reviews.userName = users.userName WHERE reviews.entryId = ? GROUP BY reviews.id ORDER BY " + order + " DESC LIMIT ? OFFSET ?;", [movieId, limit, offset]);
    let detailedReviews: IReview[] = result[0];
    if(requester == null || requester === ""){
        return detailedReviews;
    }
    if(detailedReviews.length < 1){
        return detailedReviews;
    }
    const likes = 
    await selectReviewLikesByReviewsQuery(conn, detailedReviews.map(r=> r.id), requester);
    return mergeWithReviewLikes(detailedReviews, likes, requester);
}

export async function selectReviewsByUserQuery(conn: any, userName: string, requester: string, limit: number, offset: number, orderby: EReviewOrderBy): Promise<IReview[]>{
    const orderString = orderby === EReviewOrderBy.popIndex ? "SUM(reviewLikes.value)" : "date";
    const result = 
    await conn.query("SELECT reviews.id, reviews.userName, reviews.text, reviews.date, reviews.score, reviews.entryId, entries.type as entryType, entries.title as entryTitle, SUM(reviewLikes.value) as popIndex, series.title as seriesTitle, series.id as seriesId FROM reviews LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId INNER JOIN users ON reviews.userName = users.userName INNER JOIN entries ON reviews.entryId = entries.id LEFT JOIN seasons ON entries.seasonId = seasons.id LEFT JOIN series ON seasons.seriesId = series.id WHERE reviews.userName = ? GROUP BY reviews.id ORDER BY " + orderString + " DESC LIMIT ? OFFSET ?;", 
    [userName, limit, offset]);
    const reviews: IReview[] = result[0];
    if(result[0].length < 1){
        return [];
    }
    const likes = await selectReviewLikesByReviewsQuery(conn, reviews.map(r=> r.id), requester);
    return mergeWithReviewLikes(reviews, likes, requester);
}

function mergeWithReviewLikes(reviews: IReview[], reviewLikes: IReviewLike[], requester: string): IReview[]{
    return reviews.map(review=>{
        let reviewLike = reviewLikes.find(l=> l.reviewId === review.id);
        if(reviewLike == null) {
            reviewLike = { id: 0, reviewId: review.id, userName: requester, value: 0 };
        }
        return {
            ...review,
            popIndex: parseInt((review.popIndex as unknown as string)), //its a fucking string ¯\_(ツ)_/¯
            myLike: reviewLike,
        }
    });
}

export async function selectDetailedReviewByUserAndMovieQuery(conn: any, userName: string, entryId: number, limit: number, offset: number): Promise<IReview | null>{ //todo
    const result = 
    await conn.query("SELECT reviews.id, reviews.userName, reviews.text, reviews.date, reviews.score, users.nickName, reviewLikes.value, SUM(reviewLikes.value) as popIndex, series.id as seriesId, series.title as seriesTitle FROM reviews LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId INNER JOIN users ON reviews.userName = users.userName INNER JOIN entries ON reviews.entryId = entries.id LEFT JOIN seasons ON entries.seasonId = seasons.id LEFT JOIN series ON seasons.seriesId = series.id WHERE reviews.userName = ? AND reviews.entryId = ? GROUP BY reviews.id ORDER BY reviews.date DESC LIMIT ? OFFSET ?;", [userName, entryId, limit, offset]);
    if(result[0][0] == null) {
        return null;
    }
    return {...result[0][0], entryId: entryId, popIndex: parseInt(result[0][0].popIndex)};
}

export async function selectFollowedReviewsQuery(conn, requester: string, limit: number, offset: number): Promise<IReview[]>{
    let reviews: IReview[] = [];
    const result = 
    await conn.query("SELECT follows.followed as userName, reviews.id, entries.type as entryType, reviews.entryId as entryId, reviews.date, reviews.score, reviews.text, entries.title as entryTitle, users.nickName, SUM(reviewLikes.value) as popIndex, series.title as seriesTitle, series.id as seriesId FROM follows INNER JOIN reviews ON follows.followed = reviews.userName INNER JOIN entries ON reviews.entryId = entries.id INNER JOIN users ON follows.followed = users.userName LEFT JOIN seasons ON entries.seasonId = seasons.id LEFT JOIN series ON seasons.seriesId = series.id LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId WHERE follows.follower = ? GROUP BY reviews.id ORDER BY reviews.date DESC LIMIT ? OFFSET ? ;",
    [requester, limit, offset]);
    if(result[0].length > 0){
        reviews = result[0];
    } else {
        return result[0];
    }
    const likes = await selectReviewLikesByReviewsQuery(conn, reviews.map(s=> s.id), requester);
    return mergeWithReviewLikes(reviews, likes, requester);
    //return reviews;
}

