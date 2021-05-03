import express from "express";
import { userSession } from "../config/sessionConfig";
import { isImage, return200, returnError } from "../midwares/midutils";
import selectLatestPreviewSeries, { selectDetailedSeries, insertSeries, updateSeries, insertEpisode, deleteSeries } from "../midwares/seriesMWare";
const multer = require("multer");
const controller = express.Router();
const sharp = require("sharp");
controller.use(express.json());

controller.use(userSession());

controller.post("/select_detailed_series", async function (req, res){
    try{
      await selectDetailedSeries(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/select_latest_preview_series", async function (req, res){
    try{
      await selectLatestPreviewSeries(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/insert_series", async function (req, res){
    try{
      await insertSeries(req, res);
    } catch(err){
        returnError(res, err);
    }
});

controller.post("/delete_series", async function (req, res){
  try{
    await deleteSeries(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post("/insert_episode", async function (req, res){
  try{
    await insertEpisode(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post("/update_series", async function (req, res){
    try{
      await updateSeries(req, res);
    } catch(err){
        returnError(res, err);
    }
});

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, __dirname + "/../uploads/seriesposters");
    },
    filename: function (req:any, file:any, cb:any) {
        let error = null;
        if(!isImage(file)) error = new Error("Only png, jpg and jpeg are accepted formats.");
        if(req.session == null || req.session.user == null || req.session.user.permission < 2) error = new Error("This action requires a user permission level of 2 or higher.");
        if(file.size > 200000) error = new Error("File size exceeds the given limit (200000).");
        cb(error, file.originalname);
    }
  });
   
  var upload = multer({ storage: storage });
  
  controller.post("/upload_series_poster", upload.single("poster"), (req:any, res: any) => {
    try{
        saveFiles(req, res);
    } catch(err){
        returnError(res, err);
    }
  });

  const saveFiles = (req, res) =>{
    sharp(req.file.path).resize({ width: 150 }).toFile(`${__dirname}/../uploads/seriesposters/small-${req.file.originalname}`, (err, resizeImage)=>{
      if(err){
        returnError(res, err);
      } 
    });
    sharp(req.file.path).resize({ width: 300 }).toFile(`${__dirname}/../uploads/seriesposters/medium-${req.file.originalname}`, (err, resizeImage)=>{
      if(err){
        returnError(res, err);
      }
    });
    return200(res);
  };

module.exports = controller;