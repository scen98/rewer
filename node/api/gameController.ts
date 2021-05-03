import { userSession } from "../config/sessionConfig";
import { deleteGame, insertGame, updateGame, selectDetailedGame, selectGamesByScore, selectLatestGames, insertGamePlatform, deleteGamePlatform, selectPlatforms } from "../midwares/gameMWare";
import { isImage, return200, returnError } from "../midwares/midutils";
const express = require('express');
const controller = express.Router();
controller.use(express.json());
const multer = require("multer");
const sharp = require("sharp");
controller.use(userSession());
module.exports = controller;

const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
      cb(null, __dirname + "/../uploads/posters");
  },
  filename: function (req:any, file:any, cb:any) {
      let error = null;
      if(!isImage(file)) error = new Error("Only png, jpg and jpeg are accepted formats.");
      if(req.session == null || req.session.user == null || req.session.user.permission < 2) error = new Error("No user is logged in.");
      if(file.size > 200000) error = new Error("File size exceeds the given limit (200000).");
      cb(error, file.originalname);
  }
});

const upload = multer({ storage: storage });

controller.post("/upload_poster", upload.single("poster"), (req:any, res: any) => {
  try {
    saveFiles(req, res);
  } catch(err){
    return returnError(res, err);
  }
});

const saveFiles = (req, res) =>{
    sharp(req.file.path).resize({ width: 150 }).toFile(`${__dirname}/../uploads/posters/small-${req.file.originalname}`, (err, resizeImage)=>{
      if(err){
        returnError(res, err);
      } 
    });
    sharp(req.file.path).resize({ width: 300 }).toFile(`${__dirname}/../uploads/posters/medium-${req.file.originalname}`, (err, resizeImage)=>{
      if(err){
        returnError(res, err);
      }
    });
    return200(res);
};

controller.post('/insert_game', async function (req:any, res:any) {
  try{
      await insertGame(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/update_game', async function (req:any, res:any) {
  try{
      await updateGame(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/delete_game', async function (req:any, res:any) {
  try{
      await deleteGame(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_detailed_game', async function (req:any, res:any) {
  try{
      await selectDetailedGame(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_games_by_score', async function (req:any, res:any) {
  try{
      await selectGamesByScore(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_latest_games', async function (req:any, res:any) {
  try{
      await selectLatestGames(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/insert_game_platform', async function (req:any, res:any) {
  try{
      await insertGamePlatform(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/delete_game_platform', async function (req:any, res:any) {
  try{
      await deleteGamePlatform(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.get('/get_platforms', async function (req:any, res:any) {
  try{
      await selectPlatforms(req, res);
  } catch(err){
      returnError(res, err);
  }
});