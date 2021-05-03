/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { userPath } from '../../callers/userCaller'
import FollowedUserRow from './FollowedUserRow';
import { usePOST } from '../../callers/caller';
import { IUser } from '../../../common/user';

interface IFollowingUsers{
    length: number;
}

export const FollowingUsers: React.FC<IFollowingUsers> = ({length}: IFollowingUsers) => {
    const users = useRef<IUser[]>([]);
    const [caller, signal] = usePOST({ userName: localStorage.getItem("userName"), limit: length }, userPath.selectFollowers);
    const show = 4;
    const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);
    const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("userName")){
            getFollowingUsers();
        }
        return ()=>{
            signal.abort();
        }
    }, []);

    async function getFollowingUsers(){
        const following: IUser[] = await caller();
        if(following){
            users.current = following;           
            setDisplayedUsers(users.current.slice(0, show));
        }
    }

    function showMore(){
        setDisplayedUsers(users.current.slice(0, displayedUsers.length + show));
    }

    useEffect(()=>{
        if(displayedUsers.length === users.current.length){
            setIsShowMoreVisible(false);
        } else {
            setIsShowMoreVisible(true);
        }
    }, [displayedUsers]);

    return (
        <Fragment>
            <h3 className="center-text">My Followers</h3>
            {displayedUsers.map(u=>{
                return <FollowedUserRow key={`followed-${u.userName}`} user={u} />
            })}
            {isShowMoreVisible ?
            (<p onClick={showMore} className="show-more center-text">Show more</p>):
            (<Fragment></Fragment>)} 
        </Fragment>
    )
}
export default FollowingUsers;