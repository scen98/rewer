import React from 'react'
import { IDetailedUser } from '../../../common/user'
import UserRow from './UserRow'

interface IUserRowList{
    users: IDetailedUser[];
}

export const UserRowList: React.FC<IUserRowList> = ({users}: IUserRowList) => {
    return (
        <div>
            {users.map(u=>{
                return <UserRow key={`user-row-${u.userName}`} user={u} />
            })}
        </div>
    )
}

export default UserRowList;