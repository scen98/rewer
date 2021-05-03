import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface IListLoad{
    text?: string;
    isLoading: boolean;
}

export const ListLoad:React.FC<IListLoad> = ({text, isLoading = true}: IListLoad)=>{
    return (
        <Fragment>
            {isLoading ? 
            (<div className="loading-div-small">
                <FontAwesomeIcon className="spin-slow" icon={faSpinner} />
            </div>):
            (<Fragment></Fragment>)}
            <p className="list-message">{text}</p>
        </Fragment>
    )
}

export default ListLoad;