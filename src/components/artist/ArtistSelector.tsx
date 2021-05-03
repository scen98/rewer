import React from 'react'
import { IArtist } from '../../../common/artist'
import { useAsyncReference } from '../../hooks'
import ArtistRow from './ArtistRow'
import "./artistStyle.css"

interface IArtistSelector{
    artistList: IArtist[];
    onSelectionChanged: (selectedArtist: IArtist)=> void;
}

export const ArtistSelector: React.FC<IArtistSelector> = ({artistList, onSelectionChanged}: IArtistSelector)=>{
    const [selectedArtist, setSelectedArtist] = useAsyncReference(undefined);
    function selectArtist(artist: IArtist){
        setSelectedArtist(artist);
        onSelectionChanged(selectedArtist.current);
    }
    return (
        <div>
            {artistList.map(a=> {
                return <ArtistRow key={`artist-row-${a.id}`} selectedArtist={selectedArtist.current} artist={a} onClick={()=>{ selectArtist(a); }} />
            })}
        </div>
    )
}
export default ArtistSelector;