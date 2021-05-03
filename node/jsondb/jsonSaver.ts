/*import { withMysql } from "../midwares/midutils";
import { selectCastTypesQuery } from "../models/castQueries";
import { selectLatestMoviesQuery, selectUpcomingMoviesQuery } from "../models/movieQueries";
import { selectGenresQuery } from "../models/genreQueries";
import { selectLatestPreviewSeriesQuery } from "../models/previewSeries";

var express = require('express');
var controller = express.Router();
controller.use(express.json());
var fs = require("fs");
var schedule = require('node-schedule');


const saveLatestMovies = schedule.scheduleJob("0 0 * * * *", async ()=>{
    await withMysql(
        async (conn)=>{
            const latestMovies = await selectLatestMoviesQuery(conn, 15, 0);
            if(latestMovies != null && latestMovies.length > 0){
                await fs.writeFile(__dirname + "/latest_movies.json", JSON.stringify(latestMovies), "utf8", ()=>{
                    log(`Successful save into latestMovies.json \n\t with selectLatestMoviesQuery \n\t ${latestMovies.length} records.`);
                });
            } else {
                log(`Empty result recieved from query, trying to save into latest_movies.json \n\t with selectLatestMoviesQuery`);
            }
        },
        (err)=>{
            const errStart = `Error trying to save into latest_movies.json error: \n\t `;
            log(errStart + err);
        }
    )
});

const saveUpcomingMovies = schedule.scheduleJob("0 5 * * * *", async ()=>{
    await withMysql(
        async (conn)=>{
            const upcomingMovies = await selectUpcomingMoviesQuery(conn, 15, 0);
            if(upcomingMovies != null && upcomingMovies.length > 0){
                await fs.writeFile(__dirname + "/upcoming_movies.json", JSON.stringify(upcomingMovies), "utf8", ()=>{
                    log(`Successful save into upcoming_movies.json \n\t with selectLatestMoviesQuery \n\t ${upcomingMovies.length} records.`);
                });
            } else {
                log(`Empty result recieved from query, trying to save into upcoming_movies.json \n\t with selectLatestMoviesQuery`);
            }
        }, 
        (err)=>{
            const errStart = `Error trying to save into upcoming_movies.json error: \n\t `;
            log(errStart + err);
        }
    )
});

const saveLatestSeries = schedule.scheduleJob("0 10 * * * *", async ()=>{
    await withMysql(
        async (conn)=>{
            const latestSeries = await selectLatestPreviewSeriesQuery(conn, 15, 0);
            if(latestSeries != null && latestSeries.length > 0){
                await fs.writeFile(__dirname + "/latest_series.json", JSON.stringify(latestSeries), "utf8", ()=>{
                    log(`Successful save into latest_series.json \n\t with selectLatestMoviesQuery \n\t ${latestSeries.length} records.`);
                });
            } else {
                log(`Empty result recieved from query, trying to save into latest_series.json \n\t with selectLatestPreviewSeriesQuery`);
            }
        }, 
        (err)=>{
            const errStart = `Error trying to save into latest_series.json error: \n\t `;
            log(errStart + err);
        }
    )
});

const saveCastTypes = schedule.scheduleJob("0 50 23 * * *", async ()=>{
    await withMysql(
        async (conn)=>{
            const castTypes = await selectCastTypesQuery(conn);
            if(castTypes){
                await fs.writeFile(__dirname + "/cast_types.json", JSON.stringify(castTypes), "utf-8", ()=>{
                    log(`Successful save into cast_types.json \n\t with selectCastTypesQuery \n\t ${castTypes.length} records`);
                });
            } else {
                log(`Empty result recieved from query, trying to save into cast_types.json \n\t with selectCastTypesQuery`);
            }
        },
        (err)=>{
            const errStart = `Error trying to save into cast_types.json error: \n\t`;
            log(errStart + err);
        }
    )
});

const saveGenres = schedule.scheduleJob("0 40 23 * * *", async()=>{
    await withMysql(
        async (conn)=>{
            const genres = await selectGenresQuery(conn);
            if(genres){
                await fs.writeFile(__dirname + "/genres.json", JSON.stringify(genres), "utf-8", ()=>{
                    log(`Successful save into genres.json \n\t with selectGenresQuery \n\t ${genres.length} records`);
                });
            } else {
                log(`Empty result recieved from query, trying to save into genres.json \n\t with selectGenresQuery`);
            }
        },
        (err)=>{
            const errStart = `Error trying to save into genres.json error: \n\t`;
            log(errStart + err);
        }
    )
});

async function log(msg: string){
    const now = new Date();
    const text = `\n${msg}\n\t in ${parseForInput(now)} ${now.getHours()}-${now.getMinutes()}`;
    try{
        fs.appendFile(__dirname + "/log.txt", text, "utf8", ()=>{  });
    } catch(err){
        const errText = `\n${err}\n\t in ${parseForInput(now)} ${now.getHours()}-${now.getMinutes()}`;
        fs.writeFile(__dirname + "/log.txt", errText, "utf8");
    }
}

function parseForInput(date: Date): string{
    let month: string;
    let day: string;
    if(date.getMonth() < 9){
        month = `0${date.getMonth()+1}`;
    } else {
        month = (date.getMonth()+1).toString();
    }
    if(date.getDate() < 10){
        day = `0${date.getDate()}`;
    } else {
        day = date.getDate().toString();
    }

    return `${date.getFullYear()}-${month}-${day}`;
}

controller.get('/savetest', async function (req:any, res:any) {
    try{
        await withMysql(
            async (conn)=>{
                const latestMovies = await selectLatestMoviesQuery(conn, 9, 0);
                if(latestMovies.length > 0){
                    const json = JSON.stringify(latestMovies)
                    await fs.writeFile(__dirname + "/latestMovies.json", JSON.stringify(json), "utf8", ()=>{ })
                }
            },
            (err)=>{
                fs.writeFile(__dirname + "/latestMovies.txt", err, "utf8", ()=>{  })
                res.send(err);
            }
        )
    } catch(err){
        res.send(err);
    }
    
    const data = { 
        msg : "HELLO THERE"
    }
    const json = JSON.stringify(data);
    fs.writeFile(__dirname + "/jsonfile.json", json, "utf8", ()=>{ res.send("Saved"); })
});


module.exports = controller; */