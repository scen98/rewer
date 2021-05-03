import { IMysqlResult } from "../config/mysqlConnection";
import { IAuthUser, IUserPermission } from "../../common/user";

export async function selectAuthUserQuery(con: any, userName: string): Promise<IAuthUser | null>{
    const result = 
    await con.query('SELECT users.userName, users.nickName, users.password, users.session, userPermissions.level as permission FROM users INNER JOIN userPermissions on users.userName = userPermissions.userName WHERE users.userName = ?', [userName]);
    if (result[0].length < 1) {
        return null;
    }
    return result[0][0];
}

export async function insertAuthUserQuery(con: any, authUser: IAuthUser){
    const result =
    await con.query("INSERT INTO users (userName, nickName, password, session) VALUES (?, ?, ?, ?);", [ authUser.userName, authUser.nickName, authUser.password, authUser.session]);
    return result[0];
}

export async function updateSessionQuery(con: any, userName: string): Promise<string>{
    const crypto = require('crypto');
    const session = crypto.createHash('md5').update(Math.random().toString(36).substring(10)).digest("hex");
    const result = 
    await con.query("UPDATE users SET session = ? WHERE userName = ?", [ session, userName ]);
    if(result[0].affectedRows > 0){
        return session;
    } else {
        return "";
    }
}

export async function updatePasswordQuery(con: any, userName:string, password: string): Promise<IMysqlResult>{
    const result = await con.query("UPDATE users SET password = ? WHERE userName = ?", [password, userName]);
    return result[0];
}

export async function insertPermissionQuery(con:any, userName: string, level: number){
    const result = await con.query("INSERT INTO userPermissions (userName, level) VALUES (?, ?)", [userName, level]);
    return result[0];
}

export async function deleteUserQuery(con: any, userName: string){
    const result = await con.query("DELETE FROM users WHERE userName = ?", [userName]);
    return result[0];
}

export async function updatePermissionQuery(conn, permission: IUserPermission): Promise<boolean>{
    const result = await conn.query("UPDATE userPermissions set level = ? WHERE userName = ?", [permission.level, permission.userName]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}