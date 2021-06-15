
import { returnError } from "./midwares/midutils";
import mainSearch, { autoComplete } from "./midwares/search";
const express = require("express");
const path = require("path");
const app = express();
const port = 4000; 
app.use(express.json());
const genres = require("./api/genreController");
const users = require("./api/userController");
const movies = require("./api/movieController");
const series  = require("./api/seriesController");
const seasons  = require("./api/seasonController");
const artists = require("./api/artistController");
const reviews = require("./api/reviewController");
const casts  = require("./api/castController");
const follows = require("./api/followController");
const articles = require("./api/articleController");
const games = require("./api/gameController");

const backendPath = "/rewer/node";

app.use(backendPath + "/genre", genres);
app.use(backendPath + "/user", users);
app.use(backendPath + "/movie", movies);
app.use(backendPath + "/series", series);
app.use(backendPath + "/review", reviews);
app.use(backendPath + "/cast", casts);
app.use(backendPath + "/artist", artists);
app.use(backendPath + "/season", seasons);
app.use(backendPath + "/follow", follows);
app.use(backendPath + "/article", articles);
app.use(backendPath + "/game", games);
app.use("/rewer/uploads", express.static(__dirname + "/uploads"));
app.use("/rewer/static", express.static(__dirname + "/public/static"));
app.use("/rewer/manifest.json", express.static(__dirname + "/public/manifest.json"));
app.use("/rewer/favicon.ico", express.static(__dirname + "/public/favicon.ico"));
app.use("/rewer/robots.txt", express.static(__dirname + "/public/robots.txt"));
app.use(backendPath + "/jsondb", express.static(__dirname + "/jsondb"));

app.post(backendPath + "/search", async (req, res) => {
  await mainSearch(req, res);
});

app.post(backendPath + "/auto-complete", async (req, res)=>{
  try{
    await autoComplete(req, res);
  } catch (err) {
    returnError(res, err);
  }
});

app.get([
  "/rewer/home",
  "/rewer/news",
  "/rewer/movie", 
  "/rewer/series",
  "/rewer/profile",
  "/rewer/series",
  "/rewer/follows",
  "/rewer/myarticles",
  "/rewer/search",
  "/rewer/editseries",
  "/rewer/editmovie",
  "/rewer/star",
  "/rewer/user",
  "/rewer/game",
  "/rewer/editgame"
], function (req, res){
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

//app.listen();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});