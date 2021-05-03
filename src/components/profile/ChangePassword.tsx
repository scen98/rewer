/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { updatePassword } from '../../callers/authUserCaller';
import { onEnter } from '../../hooks';
import { MessageContext } from '../Messenger';
import "./profileStyle.css";

interface IChangePassword{
    //????
}

export const ChangePassword: React.FC<IChangePassword> = ()=> {
    const [oldPw, setOldPw] = useState("");
    const [newPw1, setNewPw1] = useState("");
    const [newPw2, setNewPw2] = useState("");
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        return ()=>{
            messenger.clear();
        }
    }, []);

    async function updatePasswordCommand(){
        if(newPw1 !== newPw2){
            messenger.addWarning("The two passwords don't match");
            clearInput();
            return false;
        }
        if(await updatePassword({ userName: localStorage.getItem("userName"), password: oldPw, permission: 0, nickName: localStorage.getItem("nickName")}, newPw1)){
            messenger.clear();
            messenger.addWarning("Your password has been updated.");
            clearInput();
            return true;
        } else {
            messenger.addFail("Access denied.");
            clearInput();
            return false;
        }
    }

    function clearInput(){
        setOldPw("");
        setNewPw1("");
        setNewPw2("");
    }

    return (
       <Fragment>
            <h2>Update password</h2>
            <div>
                <label className="form-item">Current password:</label>
                <input value={oldPw} onChange={e=> setOldPw(e.target.value)} type="password" className="form-item" placeholder="Enter old password" />
                <br/>
                <label className="form-item">New password:</label>
                <input value={newPw1} onChange={e=> setNewPw1(e.target.value)} type="password" className="form-item" placeholder="Enter new password" />
                <br/>
                <label className="form-item">New password again:</label>
                <input value={newPw2} onChange={e=> setNewPw2(e.target.value)} onKeyDown={(e)=> { onEnter(e, updatePasswordCommand) }} type="password" className="form-item" placeholder="Enter new password again" />
                <br/>
            </div>
            <button onClick={updatePasswordCommand} type="button" className="center">Update password</button>
       </Fragment>
    )
}
export default ChangePassword;