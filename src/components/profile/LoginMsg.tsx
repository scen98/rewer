import React from 'react'
import { Link } from "react-router-dom"

interface ILoginMsg{
    message: string;
}

export const LoginMsg: React.FC<ILoginMsg> = ({message}: ILoginMsg) => {
    return (
    <p>You must be <Link to="/rewer/profile">logged in</Link> {message}</p>
    )
}

export default LoginMsg;