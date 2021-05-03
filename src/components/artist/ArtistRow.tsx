import React, { useRef } from 'react'
import { IArtist } from '../../../common/artist';
import { parseDateYYYYMMDD } from '../../dateParser'
import { ESize, useImage } from '../../hooks';
interface IArtistRow{
    artist: IArtist;
    onClick: ()=> void;
    selectedArtist: IArtist;
}

export const ArtistRow: React.FC<IArtistRow> = ({artist, onClick, selectedArtist}: IArtistRow) => {
    const divRef = useRef<HTMLDivElement>();
    const [imgsrc, onError] = useImage(`/rewer/uploads/portraits`, `${artist.id}.jpg`, ESize.Small, true);
    const select = () =>{
        onClick();
    } 
    function setSelection(): string{
        if(selectedArtist == null){
            return "artist-row";
        }
        if(selectedArtist.id === artist.id){
            return "artist-row selected-row";
        }
        return "artist-row";
    }
    return (
        <div ref={divRef} onClick={select} className={setSelection()}>
                <img src={imgsrc} onError={onError}  alt={"NOT SET"} />
                <p>{artist.name}</p>
                <p title={artist.birthPlace}>{parseDateYYYYMMDD(new Date(artist.birthDate))}</p>
        </div>
    )
}

export default ArtistRow;
