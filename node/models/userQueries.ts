import { IUser, WSelectFollowersRequest, WSelectFollowedUsersRequest } from "../../common/user";
//it might look like these are swapped, but nope
export async function selectFollowersQuery(con: any, request: WSelectFollowersRequest): Promise<IUser[] | null>{ //egy adott felhasználó követői
    try{
        const result = await con.query("SELECT users.userName, users.nickName FROM follows INNER JOIN users ON follows.follower = users.userName WHERE followed = ?  GROUP BY users.userName ORDER BY follows.id DESC LIMIT ? OFFSET ?", [request.userName, request.limit, request.offset]);
        return result[0];
    } catch{
        return null;
    }
}

export async function selectFollowedUsersQuery(con: any, request: WSelectFollowedUsersRequest): Promise<IUser[] | null>{ //egy adott felhasználó által követett felhasználók
    try {
        const result = await con.query("SELECT users.userName, users.nickName FROM follows INNER JOIN users ON follows.followed = users.userName WHERE follower = ? GROUP BY users.userName ORDER BY users.nickName LIMIT ? OFFSET ?", [request.userName, request.limit, request.offset]);
        return result[0];
    } catch {
        return null;
    }
}