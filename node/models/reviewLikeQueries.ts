import { IReviewLike } from "../../common/reviewLike";

export async function insertReviewLikeQuery(conn: any, reviewLike: IReviewLike): Promise<number | null>{
    const result = 
    await conn.query("INSERT INTO reviewLikes (reviewId, userName, value) VALUES (?, ?, ?)", [reviewLike.reviewId, reviewLike.userName, reviewLike.value]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function updateReviewLikeQuery(conn: any, reviewLike: IReviewLike): Promise<boolean>{
    const result = 
    await conn.query("UPDATE reviewLikes SET value = ? WHERE id = ?", [reviewLike.value, reviewLike.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function doesReviewLikeExistQuery(conn: any, reviewLike: IReviewLike): Promise<boolean>{
    const result = 
    await conn.query("SELECT COUNT(id) as reviewCount FROM reviewLikes WHERE userName = ? AND reviewId = ?", [reviewLike.userName, reviewLike.reviewId]);
    if(result[0][0].reviewCount < 1){
        return false;
    }
    return true;
}

export async function selectReviewLikesByReviewsQuery(conn, ids: number[], requester: string){
    const result = await conn.query("SELECT * FROM reviewLikes WHERE reviewId IN (?) AND userName = ?;", [ids, requester]);
    return result[0];
}