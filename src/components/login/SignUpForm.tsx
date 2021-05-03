import React, { useState, useRef } from 'react'
import "../profile/profileStyle.css";
import { useBinder } from '../../hooks';
import { insertAuthUser } from '../../callers/authUserCaller';
import { doesExist } from '../../callers/userCaller';
import { WDoesUserExistResponse } from '../../../common/user';
interface SignUpForm{

}

export const SignUpForm: React.FC<SignUpForm> = ()=> {
    const [userTakenMsg, setUserTakenMsg] = useState("");
    const [msg, setMsg] = useState("");
    const [newUser, setNewUser, bindNewUser] = useBinder({userName: "", nickName: "", password: "", permission: 0});
    const pw2 = useRef<HTMLInputElement>();

    async function checkCommand(){
        const doesExistResponse = await doesExist(newUser.userName);
        if(doesExistResponse.status !== 200){
            setUserTakenMsg("Server error: invalid response from the server.");
            return true;
        }
        if((await doesExistResponse.json() as WDoesUserExistResponse).exists){
            setMsg("Username already taken.");
            setUserTakenMsg("Taken");
            return true;
        } 
        setUserTakenMsg("Free");
        return false;
    }
    async function signUpCommand(){
        if(newUser.userName.length === 0){
            setMsg("The username must be at least one character long.");
            return false;
        }
        if(newUser.userName.length > 255){
            setMsg("The username is too long.");
            return false;
        }
        if(await checkCommand()){
            return false;
        } 
        if(newUser.password !== pw2.current.value){
            setMsg("The two passwords don't match.");
            return false;
        }
        console.log("requesting");
        await sendSignUpRequest();
        return true;
    }

    async function sendSignUpRequest(){
        if(newUser.userName.length < 6) {
            setMsg("Username must be at least 5 characters long.");
            return false;
        }
        if(newUser.password.length < 6) {
            setMsg("Password must be at least 5 characters long.");
            return false;
        }
        if(newUser.nickName.length > 300){
            setMsg("Your nickname can't be longer than 300 characters.");
            return false;
        }
        if(newUser.userName.length > 255){
            setMsg("Your nickname can't be longer than 255 characters.");
            return false;
        }
        const response = await insertAuthUser(newUser);
        if(response.status === 201){
            setMsg("You have successfully signed up to our website! Note: in this version of the application, all registered users automatically recieve level 2 (moderator) permissions.");
            return true;
        } else {
            setMsg("Server error: process failed.");
            return false;
        }
    }

    return (
        <div>
            <h2>Sign up</h2>
                <div className="form-container">
                    <label className="form-item">New username:</label>
                    <input value={newUser.userName} onChange={bindNewUser} className="form-item" name="userName" placeholder="Unique name which you can log in with" />
                    <div className="form-item"></div><div className="form-item"><span className="form-item">{userTakenMsg}</span><button onClick={checkCommand}>Check</button></div>
                    <label className="form-item">New nickname:</label>
                    <input value={newUser.nickName} onChange={bindNewUser} className="form-item" name="nickName" placeholder="Name seen by others" />
                    <label className="form-item">New password:</label>
                    <input value={newUser.password} onChange={bindNewUser} className="form-item" type="password" name="password" placeholder="Password" />
                    <label className="form-item">New password again:</label>
                    <input ref={pw2} className="form-item" type="password" name="newPassword2" placeholder="Password again" />
                </div>
                <p>{msg}</p>
                <button onClick={signUpCommand} className="login-btn" type="button">Sign Up</button>        
        </div>
    )
}

export default SignUpForm