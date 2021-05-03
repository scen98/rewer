import { userSession } from "../config/sessionConfig";
import deleteSeriesGenre, { selectGenres, insertEntryGenre, deleteEntryGenre, insertSeriesGenre, selectMovieGenres, selectGameGenres } from "../midwares/genreMWare";
import { returnError } from "../midwares/midutils";
var express = require('express');
var controller = express.Router();
controller.use(userSession());

controller.get('/select_genres', async function (req:any, res:any) {
    try{
        await selectGenres(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/insert_entry_genre', async function (req:any, res:any) {
    try{
        await insertEntryGenre(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/delete_entry_genre', async function (req:any, res:any) {
    try{
        await deleteEntryGenre(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/insert_series_genre', async function (req:any, res:any) {
    try{
        await insertSeriesGenre(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/delete_series_genre', async function (req:any, res:any) {
    try{
        await deleteSeriesGenre(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.get("/select_movie_genres", async function(req, res){
    try{
        await selectMovieGenres(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.get("/select_game_genres", async function(req, res){
    try{
        await selectGameGenres(req, res);
    } catch(err){
        returnError(res, err);
    }
});

module.exports = controller;
