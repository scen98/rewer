/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from "react";
import "../main.css";
import EditMovieDetails from "../components/movie/EditMovieDetails";
import { moviePath } from "../callers/movieCaller";
import { useBinder } from "../hooks";
import { changeParam, getParameter } from "../urlManager";
import { EditCast, } from "../components/movie/EditCast";
import GenreAdder from "../components/movie/GenreAdder";
import { IEntryGenre, IGenre } from "../../common/genre";
import { ECallType, usePOST } from "../callers/caller";
import { IDetailedMovie } from "../../common/movie";
import { MessageContext } from "../components/Messenger";
import "../components/movie/movieStyle.css";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContext } from "../components/Modal";

export default function EditMovie(){
    const [movie, setMovie, bindMovie] = useBinder<IDetailedMovie>({id: parseInt(getParameter("movieId")), title: "", releaseDate: "", summary: "", runtime: 0, casts: [], genres: []});
    const [movieCaller, signal] = usePOST();
    const { messenger } = useContext(MessageContext);
    const { showModal } = useContext(ModalContext);

    useEffect(()=>{
        if(movie.id > 0){
            getMovie();
        }
        return ()=>{
            signal.abort();
            messenger.clear();
        }
    }, []);

    useEffect(()=>{
        if(movie) document.title = `(Edit) ${movie.title} - Rewer`;
    }, [movie]);
    
    async function getMovie(){
        const selectedMovie = await movieCaller({ id: movie.id}, moviePath.selectDetailedMovie, ECallType.SELECT);
        if(selectedMovie){
            setMovie(selectedMovie);
        } else {
            messenger.addFail("Server error: could not retireve movie data.");
        }
    }

    async function saveMovie(){
        if(await movieCaller(movie, moviePath.updateMovie, ECallType.ISOK)){
            messenger.addSuccess("Movie details saved." , 5000);
        } else {
            messenger.addFail("Server error: movie details could not be saved.");
        }
    }

    async function createMovie(){
        const newId = await movieCaller(movie, moviePath.insertMovie, ECallType.INSERT);
        if(newId){
            setMovie({ ...movie, id: newId });
            changeParam({ name: "movieId", value: newId.toString() });
            messenger.addSuccess("Movie page created.", 3000);
        } else {
            messenger.addFail("Server error: movie could not be created.");
        }
    }

    async function addGenre(genre: IGenre){
        const newMovieGenre: IEntryGenre = { 
            id: 0,
            entryId: movie.id, 
            genreId: genre.id, 
            genreName: genre.name };
        newMovieGenre.id = await movieCaller(newMovieGenre, moviePath.insertEntryGenre, ECallType.INSERT);
        if(newMovieGenre.id > 0){
            setMovie({...movie, genres: [ ...movie.genres, newMovieGenre ]});
        }
    }

    async function removeGenre(id: number){
        if(await movieCaller({ id: id}, moviePath.deleteEntryGenre, ECallType.ISOK)){
            setMovie({...movie, genres: movie.genres.filter(g=> g.id !== id)});
        } else {
            messenger.addFail("Server error: could not delete genre.");
        }
    }

    function onDelete(){
        showModal(()=>{
            deleteMovie();
        }, {
            title: `Deleting game`,
            acceptButton: <Fragment>Delete</Fragment>,
            refuseButton: <Fragment>Cancel</Fragment>,
            content: 
            <Fragment>
                <p>
                    If you delete this movie's page, you won't be able to recover its content later. All reviews written for this movie will be also deleted permanantly. 
                </p>
                <p>Are you sure you want to proceed?</p>
            </Fragment>
        })
    }
 
    async function deleteMovie(){
        const success = await movieCaller({ id: movie.id }, moviePath.deleteMovie, ECallType.ISOK);
        if(success){
            const title = movie.title;
            messenger.addWarning(`Movie "${title}" was permanently deleted.`)
            setMovie({id: 0, title: "", releaseDate: "", summary: "", runtime: 0, casts: [], genres: []});
            changeParam({ name: "movieId", value: "0" })
        } else {
            messenger.addFail("Server error: unable to delete game.");
        }
    }

    return (
    <Fragment>
        <div className="main-container">
            <div className="adder-panel">
                {(movie.id > 0)?
                (<Fragment>
                    <button onClick={saveMovie}><FontAwesomeIcon icon={faSave} />Save</button>
                    <button onClick={onDelete}><FontAwesomeIcon icon={faTrash} />Delete</button>
                </Fragment>) :
                (<button onClick={createMovie}>Create</button>)}
            </div>       
            <EditMovieDetails movie={movie} movieBinder={bindMovie} />
            {(movie.id > 0)?
            (<Fragment>
                <GenreAdder movie={movie} onAdd={(genre: IGenre)=> { addGenre(genre) }} onDelete={(id:number)=> { removeGenre(id) }} />
                <div className="divider" />
                <EditCast entry={movie} setEntry={(m: IDetailedMovie)=> { setMovie(m) }} />
            </Fragment>):
            (<Fragment></Fragment>)}
        </div>
    </Fragment>)
}