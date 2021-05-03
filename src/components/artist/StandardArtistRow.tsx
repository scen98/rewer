import React, { useState, useEffect } from 'react'
import { normalFormat } from '../../dateParser';
import { Link } from "react-router-dom"
import "./artistStyle.css"
import { IArtist } from '../../../common/artist';
import { ESize, useImage } from '../../hooks';

interface IStandardArtistRow{
    artist: IArtist;
}

export const StandardArtistRow: React.FC<IStandardArtistRow> = ({artist}: IStandardArtistRow) => {
    const [imgsrc, onError] = useImage("/rewer/uploads/portraits", `${artist.id}.jpg`, ESize.Small);
    const [bio, setBio] = useState("");
    useEffect(()=>{
        if(artist.bio.length > 80){
            setBio(`${artist.bio.substring(0, 150)}...`);
        } else {
            setBio(artist.bio);
        }
    }, [artist])
    return (
    <Link className="standard-artist-grid highlight" to={`/rewer/star?artistId=${artist.id}`}>
        <img src={imgsrc} alt={`poster-${artist.id}`} title={artist.name} onError={onError} />
        <div>
            <p className="name">{artist.name}</p>
            <p>{normalFormat(artist.birthDate.toString())}</p>
            <p >{bio}</p>
        </div>
    </Link>
    )
}

export default StandardArtistRow;