import { userSession } from "../config/sessionConfig";
import updateArtist, { deleteArtist, insertArtist, selectArtistsByKeyword, selectDetailedArtist } from "../midwares/artistMWare";
import { isImage, return200, returnError } from "../midwares/midutils";

var express = require('express');
var multer = require("multer");
var controller = express.Router();
controller.use(express.json());
controller.use(userSession());
module.exports = controller;
const jimp = require("jimp");

var storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
      cb(null, __dirname + "/../uploads/portraits");
  },
  filename: function (req:any, file:any, cb:any) {
      let error = null;
      if(!isImage(file)) error = new Error("Only png, jpg and jpeg are accepted formats.");
      if(req.session == null || req.session.user == null || req.session.user.permission < 2) error = new Error("No user is logged in.");
      if(file.size > 200000) error = new Error("File size exceeds the given limit (200000).");
      cb(error, file.originalname);
  }
}); 
  
var upload = multer({ storage: storage }); 
 
controller.post("/upload_portrait", upload.single("portrait"), (req:any, res: any) => {
    try{
      resizeImage(req, res);
    } catch(err){
      returnError(res, err);
    }
});

const resizeImage = (req, res)=>{
  jimp.read(req.file.path)
  .then(img => {
    img.resize(300, jimp.AUTO).quality(100).write(`${__dirname}/../uploads/portraits/medium-${req.file.originalname}`);
    img.resize(150, jimp.AUTO).quality(100).write(`${__dirname}/../uploads/portraits/small-${req.file.originalname}`);     
     return return200(res);
  })
  .catch(err => {
    returnError(res, err);
  });
}

controller.post('/select_artists_by_keyword', async function (req:any, res:any) {
  try{
    await selectArtistsByKeyword(req, res);
  } catch(err){
    returnError(res, err);
  }
});

controller.post('/select_detailed_artist', async function (req:any, res:any) {
  try{
    await selectDetailedArtist(req, res);
  } catch(err){
    returnError(res, err);
  }
});

controller.post("/insert_artist", async function (req:any, res:any) {
  try{
    await insertArtist(req, res);
  } catch(err){
    returnError(res, err);
  }
});

controller.post("/update_artist", async function (req:any, res:any) {
  try{
    await updateArtist(req, res);
  } catch(err){
    returnError(res, err);
  }
});

controller.post("/delete_artist", async function (req:any, res:any) {
  try{
    await deleteArtist(req, res);
  } catch(err){
    returnError(res, err);
  }
});