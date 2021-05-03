import { IDetailedUser, IUser, WDoesUserExistRequest, WSelectFollowedUsersRequest, WSelectFollowersRequest } from "../../common/user";
import * as caller from "./caller";

export const userPath = {
    doesExist: "/user/does_exist",
    selectDetailedUser: "/user/select_detailed_user",
    uploadAvatar: "/user/upload_avatar",
    updateUserInfo: "/user/update_user_info",
    selectFollowers: "/user/select_followers",
    selectFollowedUsers: "/user/select_followed_users"
}

export async function doesExist(userName: string): Promise<Response>{
    const request: WDoesUserExistRequest = { userName: userName };
    const response = await caller.POSTAsynch("/user/does_exist", request);
    return response;
}

export async function selectDetailedUser(userName: string): Promise<IDetailedUser | null>{
    const request = { userName: userName };
    const response = await caller.POSTAsynch("/user/select_detailed_user", request);
    if(response.status === 200){
        return await response.json();
    }
    return null;
}

export async function uploadAvatar(file: FormData){
    const response = await caller.UploadFile("/user/upload_avatar", file);
    return response;
}

export async function updateUserInfo(detailedUser: IDetailedUser): Promise<boolean>{
    const response = await caller.POSTAsynch("/user/update_user_info", detailedUser);
    if(response.status === 200){
        return true;
    }
    return false;
}

export async function selectFollowers(data: WSelectFollowersRequest): Promise<IUser[] | null>{
    const response = await caller.POSTAsynch("/user/select_followers", data);
    if(response.status !== 200) return null;
    return await response.json();
}

export async function selectFollowedUsers(data: WSelectFollowedUsersRequest): Promise<IUser[] | null>{
    const response = await caller.POSTAsynch("/user/select_followed_users", data);
    if(response.status !== 200) return null;
    return await response.json();
}