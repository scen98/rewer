import React from 'react'
import { Link } from "react-router-dom"
import { IUser } from '../../../common/user';
import { ESize, useImage } from '../../hooks';

interface IFollowedUserRow{
    user: IUser;
}

export const FollowedUserRow: React.FC<IFollowedUserRow> = ({user}: IFollowedUserRow) => {
    const [imgsrc, onImgError] = useImage("/rewer/uploads/avatars", `${user.userName}.jpg`, ESize.Small);
    return (
        <Link to={`/rewer/user?userName=${user.userName}`}>
            <div className="followed-user-row highlight">
                <img src={imgsrc} onError={onImgError} className="followed-user-row-item" alt="user-poster" />
                <p className="followed-user-row-item">{user.nickName}</p>
            </div>
        </Link>            
    )
}
export default FollowedUserRow;