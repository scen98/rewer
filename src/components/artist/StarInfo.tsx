/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import { normalFormat } from '../../dateParser'
import { Link } from "react-router-dom"
import { IDetailedArtist } from '../../../common/artist';
import { useCutter, useImage } from '../../hooks';
import "./artistStyle.css"

interface IStarInfo{
    artist: IDetailedArtist;
}

export const StarInfo: React.FC<IStarInfo> = ({artist}: IStarInfo) => {
    const [died, setDied] = useState(null);
    const charCount = 1200;
    const deathInfo = 
    <Fragment>
        <p>Died: <i>{`${normalFormat(artist.deathDate.toString())},`}</i></p>
        <p><i>{artist.deathPlace}</i></p>
    </Fragment>;
    const [bio, isBioCut, cutBio] = useCutter(artist.bio, charCount);
    useEffect(()=>{
        if(artist.deathPlace != null && artist.deathPlace !== ""){
            setDied(deathInfo);
        } else {
            setDied(<Fragment></Fragment>);
        }
    }, [artist]);

    const [imgsrc, onError] = useImage("/rewer/uploads/portraits", `${artist.id}.jpg`);

    useEffect(()=>{
        cutBio(artist.bio, charCount);
    }, [artist]);

    return (
        <div>
        {window.screen.width > 600 ? 
        (<div className="info-grid">
                <div className="info-grid-item text">
                    <h2>{artist.name}</h2>
                    <p>
                    {parseInt(localStorage.getItem("permission")) > 1 ?
                    (<Link to={`/rewer/editartist?artistId=${artist.id}`}>Edit this star's page</Link>) : 
                    (<Fragment></Fragment>)}
                    </p>
                    {bio}
                    {(isBioCut)?
                    (<Fragment><p onClick={()=>{  cutBio(artist.bio) }} className="show-more">Show more</p></Fragment>):
                    (<Fragment>
                        {(artist.bio.length > charCount)? 
                        (<Fragment><p onClick={ ()=>{ cutBio(artist.bio, charCount) } } className="show-more">Show less</p></Fragment>):
                        (<Fragment></Fragment>)}</Fragment>)
                    }
                </div>
                <div>
                    <img className="info-portrait" src={imgsrc} onError={onError} alt={`${artist.name}_portrait`} />
                    <p>Born: <i>{`${normalFormat(artist.birthDate.toString())},`}</i></p>
                    <p><i>{artist.birthPlace}</i></p>  
                    {(artist.deathPlace != null && artist.deathPlace !== "")?
                    (<Fragment>
                        <p>Died: <i>{`${normalFormat(artist.deathDate.toString())},`}</i></p>
                        <p><i>{artist.deathPlace}</i></p>
                    </Fragment>):
                    (<Fragment></Fragment>)}
                </div>
            </div>) :
            (<div className="info-grid-item">
                <h2>{artist.name}</h2>
                <p>
                    {parseInt(localStorage.getItem("permission")) > 1 ?
                    (<Link to={`/rewer/editartist?artistId=${artist.id}`}>Edit this star's page</Link>) : 
                    (<Fragment></Fragment>)
                    }
                </p>
                <img className="info-portrait" src={imgsrc} onError={onError} alt={`${artist.name}_portrait`} />
                <p>Born: <i>{`${normalFormat(artist.birthDate.toString())},`}</i></p>
                <p><i>{artist.birthPlace}</i></p>  
                {died}
                <p className="text">{bio}</p>
                {(isBioCut)?
                    (<Fragment><p onClick={()=>{  cutBio(artist.bio) }} className="show-more">Show more</p></Fragment>):
                    (<Fragment>
                        {(artist.bio.length > charCount)? 
                        (<Fragment><p onClick={ ()=>{ cutBio(artist.bio, charCount) } } className="show-more">Show less</p></Fragment>):
                        (<Fragment></Fragment>)}</Fragment>)
                    }
            </div>
           )
           }
        </div>
    )
}
