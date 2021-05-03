import { userSession } from "../config/sessionConfig";
import { returnError } from "../midwares/midutils";
import { insertSeason, deleteSeason } from "../midwares/seasonMWare";

var express = require('express');
var controller = express.Router();
controller.use(userSession());

controller.post('/insert_season', async function (req:any, res:any) {
    try{
        await insertSeason(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/delete_season', async function (req:any, res:any) {
    try{
        await deleteSeason(req, res);
    } catch(err){
        returnError(res, err);
    }
});

module.exports = controller;
