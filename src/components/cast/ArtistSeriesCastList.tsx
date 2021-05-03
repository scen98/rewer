import React from 'react'
import { ISeriesCast } from '../../../common/cast'
import ArtistSeriesCastRow from './ArtistSeriesCastRow'

interface IArtistSeriesCastList{
    casts: ISeriesCast[];
}

export const ArtistSeriesCastList: React.FC<IArtistSeriesCastList> = ({casts}: IArtistSeriesCastList) => {
    return (
        <div>
            {casts.map(c=>{
                return <ArtistSeriesCastRow key={`artist-cast-${c.id}`} cast={c} />
            })}
        </div>
    )
}

export default ArtistSeriesCastList;