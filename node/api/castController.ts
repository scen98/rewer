import { userSession } from "../config/sessionConfig";
import { selectCastTypes, insertCasts, updateCast, deleteCast, insertCast } from "../midwares/castMWare";
import { returnError } from "../midwares/midutils";
var express = require('express');
var controller = express.Router();
controller.use(userSession());

controller.get('/select_cast_types', async function (req:Express.Request, res:any) {
    try{
        await selectCastTypes(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/insert_cast', async function (req:Express.Request, res:any) { 
    try{
        await insertCast(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/insert_casts', async function (req:Express.Request, res:any) {
    try{
        await insertCasts(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/update_cast', async function (req:Express.Request, res:any) { 
    try{
        await updateCast(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/delete_cast', async function (req:Express.Request, res:any) {
    try{
        await deleteCast(req, res);
    } catch(err){
        returnError(res, err);
    }
});

module.exports = controller;