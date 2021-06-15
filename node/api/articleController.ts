import { userSession } from "../config/sessionConfig";
import { deleteArticle, insertArticle, selectArticlesByUser, selectLatestArticles, updateArticle } from "../midwares/articleMWare";
import { isImage, return200, returnError } from "../midwares/midutils";

const express = require('express');
const multer = require("multer");
const controller = express.Router();
controller.use(express.json());
controller.use(userSession());
module.exports = controller;
const jimp = require('jimp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, __dirname + "/../uploads/articles");
  },
  filename: function (req, file, cb) {
      let error = null;
      if(!isImage(file)) error = new Error("Only png, jpg and jpeg are accepted formats.");
      if(req.session == null || req.session.user == null || req.session.user.permission < 2) error = new Error("No user is logged in.");
      if(file.size > 200000) error = new Error("File size exceeds the given limit (200000).");
      cb(error, file.originalname);
  }
}); 
  
var upload = multer({ storage: storage }); 
 
controller.post("/upload_article_image", upload.single("image"), (req, res) => {
    try{
      resizeImage(req, res);
    } catch(err){
      returnError(res, err);
    }
});

const resizeImage = (req, res)=>{
  jimp.read(req.file.path)
  .then(img => {
    img.resize(300, jimp.AUTO).quality(100).write(`${__dirname}/../uploads/articles/medium-${req.file.originalname}`);
    img.resize(150, jimp.AUTO).quality(100).write(`${__dirname}/../uploads/articles/small-${req.file.originalname}`);     
     return return200(res);
  })
  .catch(err => {
    returnError(res, err);
  });
}

controller.post('/insert_article', async function (req:any, res:any) {
  try{
    await insertArticle(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/update_article', async function (req:any, res:any) {
  try{
    await updateArticle(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/delete_article', async function (req:any, res:any) {
  try{
    await deleteArticle(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_latest_articles', async function (req:any, res:any) {
  try{
    await selectLatestArticles(req, res);
  } catch(err){
      returnError(res, err);
  }
});

controller.post('/select_articles_by_user', async function (req:any, res:any) {
  try{
    await selectArticlesByUser(req, res);
  } catch(err){
      returnError(res, err);
  }
});