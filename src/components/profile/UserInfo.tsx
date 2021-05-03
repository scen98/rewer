/* eslint-disable react-hooks/exhaustive-deps */
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, Fragment, useEffect, useContext } from 'react'
import { IDetailedUser } from '../../../common/user';
import { authUserPath } from '../../callers/authUserCaller';
import { ECallType, usePOST } from '../../callers/caller';
import { followPath } from '../../callers/followCaller';
import { useImage } from '../../hooks';
import { IModalContext, ModalContext } from '../Modal';
import PermissionSelect from './PermissionSelect';
import "./profileStyle.css"

interface IUserInfo{
    user: IDetailedUser;
}

export const UserInfo: React.FC<IUserInfo> = ({user}: IUserInfo) => {
    const [getUser, setUser] = useState<IDetailedUser>({...user});
    const [followBtn, setFollowBtn] = useState(<Fragment></Fragment>);
    const [imgsrc, onImgError] = useImage("/rewer/uploads/avatars", `${getUser.userName}.jpg`);
    const [followCaller, followSignal] = usePOST();
    const [follow, setFollow] = useState({id: getUser.isFollowed, follower: localStorage.getItem("userName"), followed: getUser.userName});

    const { showModal } = useContext<IModalContext>(ModalContext);

   async function updateUserPermission(newValue: string){
        const newPermission = { id:0, userName: getUser.userName, level: parseInt(newValue) };
        if(await followCaller(newPermission, authUserPath.updatePermission, ECallType.ISOK)){
            setUser({...getUser, permission: newPermission.level});
        } else {
            alert("Server error");
        }  
        setUser( {...getUser, permission: parseInt(newValue)});
        return ()=>{
            return followSignal.abort();
        }
    } 

    useEffect(()=>{
        setUser(user);
    }, [user])

    useEffect(()=>{
        if(canBeFollowed(user)){
            placeFollowBtn();
        }
    }, [follow]);

    useEffect(()=>{
        setFollow({id: getUser.isFollowed, follower: localStorage.getItem("userName"), followed: getUser.userName});
    }, [getUser])

    function canBeFollowed(toFollow: IDetailedUser){
        return localStorage.getItem("userName") != null && localStorage.getItem("userName") !== toFollow.userName;
    }

    function placeFollowBtn(){
        if(follow.id > 0){
            setFollowBtn(<button onClick={unFollowUser} className="unfollow"><FontAwesomeIcon icon={faUserMinus} />Unfollow</button>);
        } else {
            setFollowBtn(<button onClick={followUser} className="follow"><FontAwesomeIcon icon={faUserMinus} />Follow</button>);
        }
    }

    async function followUser(){
        setFollowBtn(<button className="follow">Follow</button>); //prevent double clicking   
        const newId = await followCaller(follow, followPath.insertFollow, ECallType.INSERT);
        if(newId){
            setFollow({...follow, id: newId});
        } 
    }

    async function unFollowUser(){
        showModal(deleteFollow, {
            title: ``,
            content: <p>Are you sure you want to stop following {getUser.nickName}?</p>,
            acceptButton: <Fragment>Unfollow</Fragment>,
            refuseButton: <Fragment>Cancel</Fragment>
        });
    }

    async function deleteFollow(){
        if(await followCaller({ id: follow.id}, followPath.deleteFollow, ECallType.ISOK)){
            setFollow({...follow, id: 0});
            setFollowBtn(<button className="unfollow">Unfollow</button>);
        }
    }

    return (
        <Fragment>
            <div className="user-name">
                <h1>{getUser.nickName}</h1>
                {followBtn}
                <p>{user.followerCount} followers</p>
            </div>
           
           
            {parseInt(localStorage.getItem("permission")) === 3 && user.userName !== localStorage.getItem("userName") ? 
                        (<PermissionSelect defaultValue={getUser.permission.toString()} onUpdate={(newValue: string)=>{updateUserPermission(newValue)}} />): 
                        (<Fragment></Fragment>)}
            <div className="user-grid">
                <div>
                    <img src={imgsrc} onError={onImgError} alt="user-avatar" />                   
                </div>
                <div>
                    {getUser.about.length > 0 ?
                    (<p className="text">{getUser.about}</p>):
                    (<p><i>Nothing special to see here...</i></p>)}
                    
                </div>
            </div>
        </Fragment>
    )
}

export default UserInfo;