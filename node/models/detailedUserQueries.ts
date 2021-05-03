import { IMysqlResult } from "../config/mysqlConnection";
import { IDetailedUser } from "../../common/user";
import { isFollowedQuery } from "./followQueries";

export async function selectDetailedUserQuery(con: any, userName: string, requester: string): Promise<IDetailedUser | null> {
    const result = 
    await con.query("SELECT users.userName, users.nickName, userPermissions.level as permission, users.about, COUNT(follows.id) as followerCount FROM users INNER JOIN userPermissions on users.userName = userPermissions.userName LEFT JOIN follows on users.userName = follows.followed WHERE users.userName = ?", [userName]);
    if(!result[0][0].userName){
        return null;
    }
    result[0][0].isFollowed = await isFollowedQuery(con, userName, requester);
    return result[0][0];
}

export async function updateUserQuery(con: any, detailedUser: IDetailedUser): Promise<IMysqlResult>{
    const result =
    await con.query("UPDATE users SET nickName = ?, about = ? WHERE userName = ?", [detailedUser.nickName, detailedUser.about, detailedUser.userName]);
    return result[0] as IMysqlResult;
}

export async function selectUsersByKeywordQuery(conn, keyword: string, limit: number): Promise<IDetailedUser[]>{
    const result = 
    await conn.query("SELECT users.userName, users.nickName, userPermissions.level, users.about, COUNT(follows.id) as followerCount FROM users INNER JOIN userPermissions on users.userName = userPermissions.userName LEFT JOIN follows on users.userName = follows.followed WHERE users.nickName LIKE CONCAT('%',?,'%') GROUP BY users.userName LIMIT ?",
    [keyword, limit]);
    return result[0];
}