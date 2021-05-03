import { userSession } from "../config/sessionConfig";
import { insertFollow, deleteFollow } from "../midwares/followMWare";
import { returnError } from "../midwares/midutils";

var express = require('express');
var controller = express.Router();
controller.use(userSession());

controller.post('/insert_follow', async function (req:Express.Request, res:any) {   
    try{
        await insertFollow(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post('/delete_follow', async function (req:Express.Request, res:any) {
      try{
        await deleteFollow(req, res);
    } catch(err){
        returnError(res, err);
    }
});


module.exports = controller;