import { IFollow } from "../../common/follow";

export async function isFollowedQuery(conn: any, followed: string, follower: string): Promise<number | null>{
    if(follower == null || follower === ""){
        return 0;
    }
    if(followed === follower){
        return 0;
    }
    const result = await conn.query("SELECT id FROM follows WHERE follows.follower = ? AND follows.followed = ? LIMIT 1", [follower, followed]);
    if(result[0].length < 1){
        return 0;
    } else {
        return (result[0][0] as IFollow).id;
    }    
}

export async function insertFollowQuery(conn, follow: IFollow): Promise<number | null>{
    const result = await conn.query("INSERT INTO follows (follower, followed) VALUES (?, ?);", [follow.follower, follow.followed]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function deleteFollowQuery(conn, id: number): Promise<boolean>{
    const result = await conn.query("DELETE FROM follows WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true
    }
    return false;
}

export async function selectFollowQuery(conn, id: number): Promise<IFollow>{
    const result = await conn.query("SELECT * FROM follows WHERE id = ?", [id]);
    return result[0][0];
}