import React from 'react'
import { Link } from "react-router-dom"

export interface IHeaderItem{
    to: string;
    content: any;
}

export const HeaderItem: React.FC<IHeaderItem> = ({to, content})=> { //this component is utterly fucking useless btw
    return (
            <Link to={to}>{content}</Link>
    )
}
