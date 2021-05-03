import React, { Fragment, useEffect } from 'react'
import "../main.css";
import LoginForm from '../components/login/LoginForm';
import MyProfile from '../components/profile/MyProfile';
import FollowedUsers from '../components/profile/FollowedUsers';
import FollowingUsers from '../components/profile/FollowingUsers';

interface ILogin{
    setPermissionLevel: (newPermission: number)=>any;
}

export const Login: React.FC<ILogin> = ({setPermissionLevel}: ILogin)=> {
    useEffect(()=>{
        document.title = "My Profile - Rewer";
    }, []);

    return (
        <div className="main-container">
            {localStorage.getItem("userName") != null ?
            (<Fragment>
                <MyProfile />
                <FollowedUsers />
                    <div className="bottom-border" />
                    <FollowingUsers length={20} />
            </Fragment>):
            (<LoginForm setPermissionlevel={setPermissionLevel} />)}
        </div>
    )
}

export default Login;