import React, { useRef, useState, Fragment } from 'react'
import "../profile/profileStyle.css";
import { SignUpForm } from './SignUpForm';
import { useHistory } from 'react-router-dom';
import { login } from '../../callers/authUserCaller';
import { IMessageContext, MessageContext } from '../Messenger';
interface ILoginForm{
    setPermissionlevel: (newPermission: number)=>any;
}

export const LoginForm: React.FC<ILoginForm> = ({setPermissionlevel}: ILoginForm)=> {
    const userName = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const autoLogin = useRef<HTMLInputElement>();
    const { messenger } = React.useContext<IMessageContext>(MessageContext)
    const signUpLine = 
    <Fragment>
        <p>Not signed up yet?<button onClick={addSignUp}>Do it now!</button></p> 
        <div className="bottom-border" />
    </Fragment>
    const [signUpForm, setSignUp] = useState(signUpLine);
    const history = useHistory();

    function addSignUp(){
        setSignUp(<><div className="bottom-border" /><SignUpForm /></>);
    }

    async function loginCommand(){
        const loggedInUser = await login({userName: userName.current.value, nickName: undefined, permission: 1, password: password.current.value}, autoLogin.current.checked); //csak hogy ne egy sorban legyen már
        if(loggedInUser != null){
            setPermissionlevel(loggedInUser.permission);
            history.push("/rewer/home");
            messenger.addSuccess(`Logged in as: ${loggedInUser.userName}.`, 5000);
        } else {
            messenger.addWarning("Wrong username or password.");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form action="">
                <div className="form-container">
                    <label className="form-item">Username:</label>
                    <input className="form-item" ref={userName} name="userName" placeholder="username" />
                    <label className="form-item">Password:</label>
                    <input className="form-item" ref={password} type="password" placeholder="password" name="password" />
                    <div className="form-item"><label>Keep me logged in</label><input ref={autoLogin} type="checkbox" /></div>
                    <button onClick={loginCommand} className="login-btn form-item" type="button" name="submit" >Login</button>
                </div>
            </form>
                {signUpForm}    
        </div>
    )
}

export default LoginForm
