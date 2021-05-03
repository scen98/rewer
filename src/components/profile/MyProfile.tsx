/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, Fragment, useContext } from 'react'
import { useBinder, useImage } from '../../hooks';
import { logOut } from '../../callers/authUserCaller';
import { selectDetailedUser, uploadAvatar, updateUserInfo } from "../../callers/userCaller"
import { resizeImageFn } from '../../utils';
import ChangePassword from './ChangePassword';
import "./profileStyle.css";
import { MessageContext } from '../Messenger';

export default function MyProfile() {
    const [myProfile, setMyProfile, bindMyProfile] = useBinder({ userName: localStorage.getItem("userName"), nickName: localStorage.getItem("nickName"), permission: 1, about: "" })
    const imageFile = useRef<HTMLInputElement>();
    const [imgsrc, onImgError, setImgsrc] = useImage("/rewer/uploads/avatars", `${localStorage.getItem("userName")}.jpg`);
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        getMyInfo();

        return ()=>{
            messenger.clear();
        }
    }, []);

    async function logoutCommand(){
        await logOut();
        window.location.reload();
    }

    async function updateUserInfoCommand(){
        if(await updateUserInfo(myProfile)){
            messenger.addSuccess("Your profile has been updated.", 5000);
        } else {
            messenger.addFail("Server error: failed to update your profile.");
        }
    }

    async function getMyInfo(){
        const profile = await selectDetailedUser(localStorage.getItem("userName"));
        if(profile){
            setMyProfile(profile);
        }
    }

    function handleKeyDown(e){
        if(e.key === 'Enter'){
            updateUserInfoCommand();
        }
    }

    async function uploadImageFileCommand(){
        const formData = new FormData();
        if(!imageFile.current.files[0]){
            messenger.addWarning("No file was selected.");
            return;
        }
        const resizedFile = await resizeImageFn(imageFile.current.files[0], 300, 300, 0.8);
        formData.append("avatar", resizedFile, `${localStorage.getItem("userName")}.jpg`);
        if((await uploadAvatar(formData)).status === 200){
            messenger.addSuccess("Avatar updated", 6000);
            setImgsrc("/rewer/uploads/avatars", `${localStorage.getItem("userName")}.jpg?${new Date().getTime()}`); //getTime() is to fight caching, this shit is the standard solution from now on
        } else {
            messenger.addFail("Upload failed. Make sure file's size is not bigger than 10MB.");
        }
    }
    return (
        <Fragment>
            <div className="adder-panel">
                <h3>User settings</h3>
                <button onClick={logoutCommand}>Log out</button>
            </div>          
            <div className="profile-grid">
                <div className="profile-grid-item">    
                    <img 
                        src={imgsrc} 
                        onError={onImgError}
                        className="image" 
                        alt="Avatar" 
                        title="Avatar"  />
                    <input ref={imageFile}  className="file-input" type="file" accept=".png,.jpg" />
                    <button onClick={uploadImageFileCommand} type="button">Upload</button>
                </div>
                <div className="profile-grid-item">
                    <h1>{localStorage.getItem("userName")}</h1>
                    <div>
                        <label>My nickname: </label>
                        <input className="nickname-input" type="text" name="nickName" value={myProfile.nickName} onKeyDown={handleKeyDown}  onChange={bindMyProfile} />
                        <button onClick={updateUserInfoCommand}  type="button" className="save" >Save</button>
                    </div>
                    <textarea className="about" name="about" value={myProfile.about} onChange={bindMyProfile} rows={10} ></textarea>
                </div>
            </div>
            <div className="bottom-border"></div>
            <ChangePassword />
        </Fragment>
    )
}
