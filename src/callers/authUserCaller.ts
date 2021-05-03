import * as caller from "./caller";
import { IAuthUser, WIsLoggedinResponse, WLoginRequest, WUpdatePasswordRequest } from "../../common/user";

export const authUserPath = {
    updatePermission: "/user/update_permission"
}

export async function login(authUser: IAuthUser, autoLogin: boolean): Promise<IAuthUser>{
    const data: WLoginRequest = {
        authUser: authUser,
        autoLogin: autoLogin
    }
    const response = await caller.POSTAsynch("/user/login", data);
    if(response.status !== 200){
        localStorage.clear();
        return null;
    }
    const loggedInUser: IAuthUser = await response.json();
    if(loggedInUser){
        saveUserToStorage(loggedInUser);
    }
    return loggedInUser;
}

function saveUserToStorage(authUser: IAuthUser){
    localStorage.clear();
    localStorage.setItem("userName", authUser.userName);
    localStorage.setItem("nickName", authUser.nickName);
    localStorage.setItem("permission", authUser.permission.toString());
    if(authUser){
        localStorage.setItem("session", authUser.session);
    } 
}

export async function isLoggedIn(): Promise<WIsLoggedinResponse>{
    const defaultResponse = { isLoggedin: false, setNewSession: false }
    if(!localStorage.hasOwnProperty("userName")){
        console.log("no username")
        return defaultResponse;
    }
    const response = await caller.POSTAsynch("/user/is_logged_in", { userName: localStorage.getItem("userName"), session: localStorage.getItem("session") });
    try{
        return JSON.parse(await response.text());
    } catch(err){
        console.log(err);
        console.log(response);
        logOut();
    }
    return defaultResponse; 
}

export async function updatePassword(user: IAuthUser, newPassword: string): Promise<boolean>{
    let data: WUpdatePasswordRequest = {
        authUser: user,
        newPassword: newPassword
    }
    const response = await caller.POSTAsynch("/user/update_password", data);
    return caller.isResponse200(await response.text());
}

export async function handleLogin(): Promise<Boolean>{
    const response: WIsLoggedinResponse = await isLoggedIn();
    if(response.isLoggedin === false){
        localStorage.clear();
        return false;
    }
    if(response.setNewSession){
        localStorage.setItem("session", response.newSession);
    }
    return true; 
}

export async function logOut(){
    await caller.GETAsynch("/user/log_out");
    localStorage.clear();
}

export async function insertAuthUser(authUser: IAuthUser): Promise<Response>{
    const response = await caller.POSTAsynch("/user/insert_user", authUser);
    return response;
}