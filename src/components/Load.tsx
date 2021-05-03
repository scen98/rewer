import { faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'

export interface ILoader{
    status: ELoaderStatus;
    text?: string;
}

export enum ELoaderStatus{
    Loading,
    Loaded,
    Error
}

interface ILoad{
    loader: ILoader;
}

export const Load:React.FC<ILoad> = ({loader, children}) => {
    return (
        <Fragment>
            {loader.status === ELoaderStatus.Loaded ?
            (<Fragment>
                {children}
            </Fragment>): loader.status === ELoaderStatus.Loading ?
            (<div className="loading-div-big">
                <FontAwesomeIcon className="spin-slow" icon={faSpinner} />
            </div>):
            (<div className="loading-div-big">
                <FontAwesomeIcon icon={faExclamationCircle} />
            </div>)}
            <p className="loading-msg">{loader.text}</p>        
        </Fragment>
        
    )
}

