import { userSession } from "../config/sessionConfig";
import { isImage, return200, returnError } from "../midwares/midutils";
import selectDetailedMovie, { selectMoviesByScore, selectLatestMovies, selectLatestMoviesByGenre, deleteMovie, updateMovie, selectUpcomingMovies, insertMovie } from "../midwares/movieMWare";
const express = require('express');
const controller = express.Router();
controller.use(express.json());
const multer = require("multer");
const sharp = require("sharp");
controller.use(userSession());

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

controller.post('/select_detailed_movie', async function (req:any, res:any) {
  try{
    await selectDetailedMovie(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_movies_by_score', async function (req:any, res:any) {
  try{
    await selectMoviesByScore(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_latest_movies', async function (req:any, res:any) {
  try{
    await selectLatestMovies(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_latest_movies_by_genre', async function (req:any, res:any) {
  try{
    await selectLatestMoviesByGenre(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/insert_movie', async function (req:any, res:any) {
  try{
    await insertMovie(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/delete_movie', async function (req:any, res:any) {
  try{
    await deleteMovie(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/update_movie', async function (req:any, res:any) {
  try{
    await updateMovie(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_upcoming_movies', async function (req:any, res:any) {
  try{
    await selectUpcomingMovies(req, res);
  } catch(err){
      returnError(res, err);
  }
});


module.exports = controller;