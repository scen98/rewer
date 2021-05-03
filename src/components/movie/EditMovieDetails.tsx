/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useRef, useEffect, useContext } from "react";
import "./movieStyle.css";
import { resizeImageFn } from "../../utils";
import { uploadPoster } from "../../callers/movieCaller";
import { IMovie } from "../../../common/movie";
import { parseForInput } from "../../dateParser";
import { generateEmbeddedYoutubeLink, isYoutubeLinkValid, useImage, useRatio } from "../../hooks";
import { MessageContext } from "../Messenger";
import Trailer from "./Trailer";
import { MovieRow } from "./MovieRow";

interface IEditMovieDetails{
    movie: IMovie;
    movieBinder: (e)=>void;
}

export const EditMovieDetails: React.FC<IEditMovieDetails> = ({ movie, movieBinder }: IEditMovieDetails) =>{
    const posterInput = useRef<HTMLInputElement>();
    const [posterSrc, onPosterError, setPosterSource] = useImage("/rewer/uploads/posters", `${movie.id}.jpg`);
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        if(movie.id > 0){
            setPosterSource( "/rewer/uploads/posters", `${movie.id}.jpg?${new Date().getTime()}`);
        }
        return ()=>{
            messenger.clear();
        }
    }, [movie.id]);

    async function savePoster(){
        const formData = new FormData();
        const resizedFile = await resizeImageFn(posterInput.current.files[0], 400, 600, 0.9);
        formData.append("poster", resizedFile, `${movie.id}.jpg`);
        if(await uploadPoster(formData)){
            setPosterSource( "/rewer/uploads/posters", `${movie.id}.jpg?${new Date().getTime()}`);
        } else {
            messenger.addFail("Server error: upload unsuccessful.");
        }
    }

    return (
    <Fragment>
      <div className="detail-grid">
        <div className="span-2">
            <input value={movie.title} onChange={movieBinder} name="title" type="text" placeholder="Title" className="title-input" /><br/>
            <label>Runtime:</label>
            <input value={movie.runtime} onChange={movieBinder} name="runtime" type="text" /><br/>
            <label>Release date:</label>
            <input value={parseForInput(new Date(movie.releaseDate))} onChange={movieBinder} name="releaseDate" type="date" />
            <textarea value={movie.summary} onChange={movieBinder} name="summary" placeholder="Write something about the story..." rows={20} /> 
        </div>
        <div>
            <img src={posterSrc} onError={onPosterError} alt="Poster" title="Poster" className="edit-poster"/>
            {(movie.id > 0) ? 
            (<Fragment>
                <p>It is recommended to use an image with a standard poster image ratio</p>
                <input ref={posterInput} type="file" accept=".png,.jpg,.jpeg" className="file-input" />
                <button onClick={savePoster}>Upload</button>
            </Fragment>):
            (<Fragment>
                <p>Create the movie's page to edit this picture.</p>
            </Fragment>)}
        </div>
      </div>
        <div className="divider" />
        <label>Trailer:</label>
        <input className="wide-input" value={movie.trailer} onChange={movieBinder} type="text" name="trailer" placeholder="Paste a youtube link here"  />
        <Trailer url={movie.trailer} />
        <div className="divider" />
    </Fragment>)
}

export default EditMovieDetails;