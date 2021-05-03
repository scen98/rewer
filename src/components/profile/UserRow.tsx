import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { IDetailedUser } from '../../../common/user';
import { ESize, useImage } from '../../hooks';
interface IUserRow{
    user: IDetailedUser;
}

export const UserRow: React.FC<IUserRow> = ({user}: IUserRow) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/avatars", `${user.userName}.jpg`, ESize.Small);
    const [about, setAbout] = useState("");
    useEffect(()=>{
        if(user.about.length > 100){
            setAbout(`${user.about.substring(0, 100)}...`);
        } else {
            setAbout(user.about);
        }
    }, [user])
    return (
        <Link className="user-row highlight" to={`/rewer/user?userName=${user.userName}`}>
            <img src={imgsrc} onError={onImgError} alt={`user-${user.nickName}`} />
            <div>
                <p className="name">{user.nickName}</p>
                <p>{about}</p>
            </div>
        </Link>
    )
}

export default UserRow