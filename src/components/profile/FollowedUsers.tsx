/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { IUser } from '../../../common/user';
import { usePOST } from '../../callers/caller';
import { userPath } from '../../callers/userCaller'
import FollowedUserRow from './FollowedUserRow';

interface IFollowedUsers{
    //users: User[];
}

export const FollowedUsers: React.FC<IFollowedUsers> = () => {
    const users = useRef<IUser[]>([]);
    const [followCaller, signal] = usePOST({userName : localStorage.getItem("userName")}, userPath.selectFollowedUsers);
    const show = 4;
    const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([]);
    const [isShowMoreVisible, setIsShowMoreVisible] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("userName")){
            getFollowedUsers();
        }
        return ()=>{
            signal.abort();
        }
    }, []);

    async function getFollowedUsers(){
        const followed = await followCaller();
        if(followed){
            users.current = followed;           
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
            <h3 className="center-text">Followed</h3>
            {displayedUsers.map(u=>{
                return <FollowedUserRow key={`followed-${u.userName}`} user={u} />
            })}
            {isShowMoreVisible ?
            (<p onClick={showMore} className="show-more center-text">Show more</p>):
            (<Fragment></Fragment>)}            
        </Fragment>
    )
}
export default FollowedUsers;
