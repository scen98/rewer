import { deleteUserQuery, insertAuthUserQuery, insertPermissionQuery, selectAuthUserQuery, updatePasswordQuery, updatePermissionQuery, updateSessionQuery } from "../models/authUserQueries";
import { nullCheckLimit, return200, return201, return400, return403, return404, return500, returnData, returnError, returnMissingRequest, validateProperties, withMysql } from "./midutils";
import { WDoesUserExistResponse, WIsLoggedinResponse, WSelectFollowersRequest } from "../../common/user"
import { selectDetailedUserQuery, updateUserQuery } from "../models/detailedUserQueries";
import { selectFollowedUsersQuery, selectFollowersQuery } from "../models/userQueries";

export async function doesExist(req:any, res:any){
    const response: WDoesUserExistResponse = { exists: false }
    if(!req.body.userName){
        return returnData(res, response);
    }
    await withMysql(
    async (conn)=>{
        const user = await selectAuthUserQuery(conn, req.body.userName);
        if(user != null){
            return returnData(res, { exists: true });
        }
        return returnData(res, response);
    },
    (err)=>{
        return returnError(res, err);
    });
}

export async function updateUserInfo(req: any, res: any){
    if(req.session.user == null || req.session.user.userName == null){
        return return403(res);
    }
    if(req.session.user.userName !== req.body.userName){
        return return403(res);
    }
    await withMysql(
        async (conn)=>{
            const result = await updateUserQuery(conn, req.body);
            if(result.serverStatus === 2 && result.affectedRows > 0){
                return returnData(res, {affectedRecords: result.affectedRows});
            }
            return return404(res);
        }, 
        (err: ErrorEvent)=>{
            return returnError(res, err);
        }
    )
}

export async function updatePermission(req: any, res:any){
    if(req.session == null || req.session.user == null || req.session.user.permission < 2) return return403(res, "This action requires permission level of 2 or higher.");
    if(req.body.userName == null) return returnMissingRequest(res, ["id"]);
    await withMysql(
        async (conn)=>{
           const result = await updatePermissionQuery(conn, req.body);
           if(result){
               return return200(res);
           }
           return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    )  
}

export async function updatePasswordRequest(req: any, res:any){
    if(!req.session.user){
        return return403(res);
    }
    if(req.session.user.userName !== req.body.authUser.userName){
        return return403(res);
    }
    await withMysql(
        async (conn)=>{
            await update(conn);
        },
        (err)=>{
            returnError(res, err);
        }
    )
    
    async function update(conn: any){
        const bycript = require("bcrypt");
        const validUser = await selectAuthUserQuery(conn, req.body.authUser.userName);
        if(!validUser){
            return return404(res);
        }
        const isValid = await bycript.compare(req.body.authUser.password, validUser!.password);
        if(!isValid){
            return return403(res);
        }
        const result = await updatePasswordQuery(conn, req.body.authUser.userName, await bycript.hash(req.body.newPassword, 10));
        if(result.affectedRows > 0){
            return return200(res);
        } else {
            return return403(res);
        }
    }    
}

export async function signUp(req:any, res:any){
    const bycript = require("bcrypt");

    if(!validateProperties(res, req.body, ["userName", "password", "nickName"])) return false;
    if(req.body.userName.length < 6){
        return return400(res, "Username must be at least 5 characters long.");
    }
    if(req.body.password.length < 6){
        return return400(res, "Password must be at least 5 characters long.");
    }
    if(req.body.userName.length > 255 || req.body.nickName.length > 300){
        return return400(res, "String limit exceeds the given limit.");
    }
    await withMysql( async (conn)=>{
        const hashedPassword = await bycript.hash(req.body.password, 10);
        const result = await insertAuthUserQuery(conn, { ...req.body, password: hashedPassword});
        if(result.serverStatus === 2 && result.affectedRows > 0){
            return await onUserAdd(conn);
        } else {
            return return500(res);
        }
    },
    (err)=>{
        returnError(res, err);
    });
    
    async function onUserAdd(conn: any){
        ///
        ///
        const permissionLevel = 2; //ez egy valós verzióban 1 lenne
        ///
        ///
        if((await insertPermissionQuery(conn, req.body.userName, permissionLevel)).affectedRows > 0){ //
            return return201(res);
        } else {
            await deleteUserQuery(conn, req.body.userName);
            return return500(res);
        }
    }
}

export async function selectFollowers(req:any, res:any){
    await withMysql(
        async (conn)=>{
            const request: WSelectFollowersRequest = req.body;
            nullCheckLimit(request);
            const result = await selectFollowersQuery(conn, request);
            if(result){
                return returnData(res, result);
            }
            return return500(res);
        },
        (err)=>{
            return returnError(res, err);
        }
    );
}

export async function selectFollowedUsers(req:any, res:any){
    await withMysql(
        async (conn)=>{
            const request: WSelectFollowersRequest = req.body;
            nullCheckLimit(request);
            const result = await selectFollowedUsersQuery(conn, request);
            if(result){
                return returnData(res, result);
            }
            return return500(res);
        }, 
        (err)=>{
            return returnError(res, err);
        }
    )
}

export async function selectDetailedUser(req:any, res:any){
    await withMysql(
        async (conn)=>{
            let requester = "";
            if(req.session != null && req.session.user != null){
                requester = req.session.user.userName;
            }
            const detailedUser = await selectDetailedUserQuery(conn, req.body.userName, requester);
            if(detailedUser){
                return returnData(res, detailedUser);
            }
            return return404(res);
        },
        (err)=>{
            returnError(res, err);
        }
    )
}

export async function login(req: any, res: any){
    await withMysql(async (con)=>{
        const bycript = require("bcrypt");
        const user = await selectAuthUserQuery(con, req.body.authUser.userName);
        if(user!.permission < 1) {
           return return403(res, "Permission must be higher than 0.");
        }
        const isLoginSuccessful = await bycript.compare(req.body.authUser.password, user!.password);
        if(!isLoginSuccessful) return return403(res);
        if(req.body.autoLogin){
            user!.session = await updateSessionQuery(con, user!.userName);
        }        
        req.session.user = user;
        return returnData(res, user);
    }, 
    (err)=>{
        returnError(res, err);
    })
}

export default async function isLoggedIn(req: any, res:any): Promise<boolean>{
    let response: WIsLoggedinResponse = { isLoggedin: false, setNewSession: false };
    try{
        if(checkForActiveSession(req, res, response)) return true;
        if(req.body.session == null){
            return returnData(res, response);
        }
    } catch(err){
        return returnError(res, err);
    }
    
    await checkForValidSessionToken(req, res, response);
    return response.isLoggedin;
}

function checkForActiveSession(req: any, res: any, response: WIsLoggedinResponse){   
    if(req.session.user == null){
        return false;
    } 
    if(req.session.user.userName && req.session.user.userName === req.body.userName){ 
        response.isLoggedin = true;
        return returnData(res, response);
    }   
}

async function checkForValidSessionToken(req:any, res:any, response: WIsLoggedinResponse){
    await withMysql(async (con)=>{  
        const validUser = await selectAuthUserQuery(con, req.body.userName);
        if(validUser!.session === req.body.session){ //success
            response = { isLoggedin: true, setNewSession: true, newSession: await updateSessionQuery(con, req.body.userName) };
            req.session.user = { ...validUser, session: response.newSession };
        }
        return returnData(res, response);      
        }, 
       (err)=>
       {
           returnError(res, err);
       });
}