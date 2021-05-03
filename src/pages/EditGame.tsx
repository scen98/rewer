/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect } from 'react'
import { IDetailedGame } from '../../common/game';
import { IEntryGenre, IGenre } from '../../common/genre';
import { ECallType, usePOST } from '../callers/caller';
import { gamePath } from '../callers/gameCaller';
import { moviePath } from '../callers/movieCaller';
import EditGameDetails from '../components/game/EditGameDetails';
import { MessageContext } from '../components/Messenger';
import { EditCast } from '../components/movie/EditCast';
import GenreAdder, { EGenreType } from '../components/movie/GenreAdder';
import { useBinder } from '../hooks';
import { changeParam, getParameter } from '../urlManager';
import "../components/movie/movieStyle.css";
import { ModalContext } from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PlatformAdder } from '../components/game/PlatformAdder';

export default function EditGame() {
    const [game, setGame, bindGame] = useBinder<IDetailedGame>({ 
        id: parseInt(getParameter("gameId")), 
        title: "",
        releaseDate: "",
        summary: "",
        production: "",
        casts: [],
        genres: [],
        trailer: "",
        platforms: []
    });
    const [gameCaller, signal] = usePOST();
    const { messenger } = useContext(MessageContext);
    const { showModal } = useContext(ModalContext);

    useEffect(()=>{
        if(game.id > 0){
            getGame();
        }
        return ()=>{
            signal.abort();
            messenger.clear();
        }
    }, []);

    useEffect(()=>{
        if(game) document.title = `(Edit) ${game.title} - Rewer`;
    }, [game]);

    async function getGame(){
        const selectedGame = await gameCaller({ id: game.id}, gamePath.selectDetailedGame, ECallType.SELECT);
        if(selectedGame){
            setGame(selectedGame);
        } else {
            messenger.addFail("Server error: could not retireve game data.");
        }
    }

    async function saveMovie(){
        if(await gameCaller(game, gamePath.updateGame, ECallType.ISOK)){
            messenger.addSuccess("Movie details saved." , 5000);
        } else {
            messenger.addFail("Server error: game details could not be saved.");
        }
    }

    async function createMovie(){
        console.log(game);
        if(game.title.length > 255){
            messenger.addWarning("The game's title can't be longer than 255 characters.");
            return;
        }
        if(game.production.length > 255){
            messenger.addWarning("The studio's name can't be longer than 255 characters.");
            return;
        }
        if(game.title.length === 0){
            messenger.addWarning("Warning: the game does not have a title.", 3000);
        }
        const newId = await gameCaller(game, gamePath.insertGame, ECallType.INSERT);
        if(newId){
            setGame({ ...game, id: newId });
            changeParam({ name: "gameId", value: newId.toString() });
            messenger.addSuccess("Movie page created.", 3000);
        } else {
            messenger.addFail("Server error: movie could not be created.");
        }
    }

    async function addGenre(genre: IGenre){
        const newGameGenre: IEntryGenre = { 
            id: 0,
            entryId: game.id, 
            genreId: genre.id, 
            genreName: genre.name };
        newGameGenre.id = await gameCaller(newGameGenre, moviePath.insertEntryGenre, ECallType.INSERT);
        if(newGameGenre.id > 0){
            setGame({ ...game, genres: [ ...game.genres, newGameGenre ]});
        }
    }

    async function removeGenre(id: number){
        if(await gameCaller({ id: id}, moviePath.deleteEntryGenre, ECallType.ISOK)){
            setGame({ ...game, genres: game.genres.filter(g=> g.id !== id)});
        } else {
            messenger.addFail("Server error: could not delete genre.");
        }
    }

    async function deleteGame(){
        const success = await gameCaller(game, gamePath.deleteGame, ECallType.ISOK);
        if(success){
            const title = game.title;
            messenger.addWarning(`Game "${title}" was permanently deleted.`);
            setGame({ 
                id: 0, 
                title: "",
                releaseDate: "",
                summary: "",
                production: "",
                casts: [],
                genres: [],
                platforms: []
            });
            changeParam({ name: "gameId", value: "0" });
        } else {
            messenger.addFail("Server error: unable to delete game.");
        }
    }

    function onDelete(){
        showModal(()=>{
            deleteGame();
        }, {
            title: `Deleting game`,
            acceptButton: <Fragment>Delete</Fragment>,
            refuseButton: <Fragment>Cancel</Fragment>,
            content: <p>
                If you delete this game, you won't be able to recover its content later. All reviews written for this game will be also deleted permanantly.
                Are you sure you want to proceed?
            </p>
        })
    }

    return (
        <div className="main-container">
                <div className="adder-panel">
                    {(game.id > 0)?
                    (<Fragment>
                        <button onClick={saveMovie}><FontAwesomeIcon icon={faSave} />Save</button>
                        <button onClick={onDelete}><FontAwesomeIcon icon={faTrash} />Delete</button>
                    </Fragment>) :
                    (<button onClick={createMovie}>Create</button>)}
                </div>   
                <EditGameDetails game={game} gameBinder={bindGame} />
                {(game.id > 0)?
                (<Fragment>
                    <GenreAdder movie={game} onAdd={(genre: IGenre)=> { addGenre(genre) }} onDelete={(id:number)=> { removeGenre(id) }} genreType={EGenreType.Game} />
                    <div className="divider" />
                    <PlatformAdder game={game} setGamePlatforms={(platforms)=>{ setGame({ ...game, platforms }) }} />
                    <div className="divider" />
                    <EditCast entry={game} setEntry={(g: IDetailedGame)=> { setGame(g) }} />
                </Fragment>):
            (<Fragment></Fragment>)}
        </div>
    )
}
