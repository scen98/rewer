import React from 'react'
import { IArtist } from '../../../common/artist';
import StandardArtistRow from './StandardArtistRow';

interface IArtistRowList{
    artists: IArtist[];
}

export const ArtistRowList: React.FC<IArtistRowList> = ({artists}: IArtistRowList) => {
    return (
        <div>
            {artists.map(a=>{
              return <StandardArtistRow key={`artist-row-${a.id}`} artist={a} />  
            })}
        </div>
    )
}

export default ArtistRowList;