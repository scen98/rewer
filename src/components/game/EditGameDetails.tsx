/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useRef } from 'react'
import { IGame } from "../../../common/game"
import { uploadPoster } from '../../callers/movieCaller';
import { parseForInput } from '../../dateParser';
import { generateEmbeddedYoutubeLink, isYoutubeLinkValid, useImage, useRatio } from '../../hooks';
import { resizeImageFn } from '../../utils';
import { MessageContext } from '../Messenger';
import "../movie/movieStyle.css";

interface IEditGameDetails{
    game: IGame;
    gameBinder: (e)=>any;
}

export const EditGameDetails = ({ game, gameBinder }: IEditGameDetails)=> {
    const posterInput = useRef<HTMLInputElement>();
    const [posterSrc, onPosterError, setPosterSource] = useImage("/rewer/uploads/posters", `${game.id}.jpg`);
    const [frame, listenFrame, cleanFrameListener] = useRatio<HTMLIFrameElement>(0.5625);
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        listenFrame();
        if(game.id > 0){
            setPosterSource( "/rewer/uploads/posters", `${game.id}.jpg?${new Date().getTime()}`);
        }
        return ()=>{
            messenger.clear();
            cleanFrameListener();
        }
    }, [game.id]);

    useEffect(()=>{
        if(isYoutubeLinkValid(game.trailer)){
            frame.current.style.display = "inline";
        } else {
            frame.current.style.display = "none";
        }
    }, [game.trailer]);

    async function savePoster(){
        const formData = new FormData();
        const resizedFile = await resizeImageFn(posterInput.current.files[0], 400, 600, 0.9);
        formData.append("poster", resizedFile, `${game.id}.jpg`);
        if(await uploadPoster(formData)){
            setPosterSource( "/rewer/uploads/posters", `${game.id}.jpg?${new Date().getTime()}`);
        } else {
            messenger.addFail("Server error: upload unsuccessful.");
        }
    }
    
    return (
        <Fragment>
            <div className="detail-grid">
                <div className="span-2">
                    <input value={game.title} onChange={gameBinder} name="title" type="text" placeholder="Title" className="title-input" /><br/>
                    <label>Studio:</label>
                    <input className="wide-input" value={game.production} onChange={gameBinder} name="production" type="text" placeholder="Studio's name" /><br/>
                    <label>Release date:</label>
                    <input value={parseForInput(new Date(game.releaseDate))} onChange={gameBinder} name="releaseDate" type="date" />
                    <textarea value={game.summary} onChange={gameBinder} name="summary" placeholder="Write something about the game..." rows={20} /> 
                </div>
                <div>
                    <img src={posterSrc} onError={onPosterError} alt="Poster" title="Poster" className="edit-poster"/>
                    {(game.id > 0) ? 
                    (<Fragment>
                        <p>It is recommended to use an image with a standard poster image ratio</p>
                        <input ref={posterInput} type="file" accept=".png,.jpg,.jpeg" className="file-input" />
                        <button onClick={savePoster}>Upload</button>
                    </Fragment>):
                    (<Fragment>
                        <p>Create the game's page to edit this picture.</p>
                    </Fragment>)}
                </div>
            </div>
            <div className="divider" />
            <label>Trailer:</label>
            <input className="wide-input" value={game.trailer} onChange={gameBinder} type="text" name="trailer" placeholder="Paste a youtube link here"  />
            <iframe className="trailer" ref={frame} title="Youtube trailer" src={generateEmbeddedYoutubeLink(game.trailer)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            <div className="divider" />
        </Fragment>
      
    )
}

export default EditGameDetails;