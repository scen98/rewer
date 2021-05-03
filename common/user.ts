export interface IUser{
    userName: string;
    nickName: string;
    permission: number;
}

export interface IAuthUser extends IUser{
    password: string;
    session?: string;
}

export interface IDetailedUser extends IUser{
    about: string;
    permission: number;
    followerCount?: number;
    isFollowed?: number;
}

export interface IUserPermission{
    id: number;
    userName: string;
    level: number;
}

export enum Permission{
    "User" = 1,
    "Moderator" = 2,
    "Administrator" = 3
}

export interface WLoginRequest{
    authUser: IAuthUser;
    autoLogin: boolean;
}

export interface WLoginResponse{
    isSuccessful: boolean;
    userExists: boolean;
    authUser?: IAuthUser;
}

export interface WIsLoggedinResponse{
    isLoggedin: boolean;
    setNewSession: boolean;
    newSession?: string;
}

export interface WUpdatePasswordRequest{
    authUser: IAuthUser;
    newPassword: string;
}

export interface WDoesUserExistRequest{
    userName: string;
}

export interface WDoesUserExistResponse{
    exists: boolean;
}

export interface WSelectFollowersRequest{
    userName: string;
    limit?: number;
    offset?: number;
}

export interface WSelectFollowedUsersRequest{
    userName: string;
    limit?: number;
    offset?: number;
}