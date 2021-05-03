import React from 'react'
import { IEntryCast } from '../../../common/cast'
import ArtistCastRow from './ArtistCastRow'
import "./castStyle.css"

interface IArtistCastList{
    casts: IEntryCast[];
}

export const ArtistCastList: React.FC<IArtistCastList> = ({casts}: IArtistCastList) => {
    return (
        <div>
            {casts.map(c=>{
                return <ArtistCastRow key={`artist-cast-${c.id}`} cast={c} />
            })}
        </div>
    )
}

export default ArtistCastList;