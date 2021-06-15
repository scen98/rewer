import { userSession } from "../config/sessionConfig";
import express from "express";
import { return200, return500, returnError } from "../midwares/midutils";
import isLoggedIn, { login, updatePasswordRequest, signUp, doesExist, selectDetailedUser, updateUserInfo, selectFollowers, selectFollowedUsers, updatePermission } from "../midwares/userMWare";
const multer = require("multer");
const controller = express.Router();
controller.use(express.json());
const jimp = require("jimp");
controller.use(userSession());

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, __dirname + "/../uploads/avatars");
    },
    filename: function (req: any, file: any, cb: any) {
        let error = null;
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg") error = new Error("Only png, jpg and jpeg are accepted formats.");
        if (req.session == null || req.session.user == null) error = new Error("No user is logged in.");
        if (file.size > 200000) error = new Error("File size exceeds the given limit (200000).");
        cb(error, `${req.session.user.userName}.jpg`);
    }
})

var upload = multer({ storage: storage })

controller.post("/upload_avatar", upload.single("avatar"), (req: any, res) => {
    try {
        resizeImage(req, res);
    } catch (err) {
        return returnError(res, err);
    }
});

const resizeImage = (req, res) => {
    jimp.read(req.file.path)
        .then(img => {
            img.resize(300, jimp.AUTO).quality(100).write(`${__dirname}/../uploads/avatars/medium-${req.file.originalname}`);
            img.resize(150, jimp.AUTO).quality(100).write(`${__dirname}/../uploads/avatars/small-${req.file.originalname}`);
            return return200(res);
        })
        .catch(err => {
            returnError(res, err);
        });
}

controller.post('/login', async function (req, res) {
    try { 
        await login(req, res);
    } catch (err) {
        returnError(res, err);
    } 
});

controller.post("/is_logged_in", async function (req: any, res: any) {
    try {
        await isLoggedIn(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/update_password", async function (req: any, res: any) {
    try {
        await updatePasswordRequest(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/insert_user", async function (req: any, res: any) {
    try {
        await signUp(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/does_exist", async function (req: any, res: any) {
    try {
        await doesExist(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/select_detailed_user", async function (req: any, res: any) {
    try {
        await selectDetailedUser(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/update_user_info", async function (req: any, res: any) {
    try {
        await updateUserInfo(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.get("/log_out", function (req: any, res) {
    try {
        req.session.destroy();
        return return200(res);
    } catch {
        return return500(res);
    }
});

controller.post("/select_followers", async function (req: any, res: any) {
    try {
        await selectFollowers(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/select_followed_users", async function (req: any, res: any) {
    try {
        await selectFollowedUsers(req, res);
    } catch (err) {
        returnError(res, err);
    }
});

controller.post("/update_permission", async function (req: any, res: any) {
    try {
        await updatePermission(req, res);
    } catch (err) {
        returnError(res, err);
    }
});
/*
controller.post("/update_email", async function (req:any, res:any) {
    try{
        await updateEmail(req, res);
    } catch(err){
        returnError(res, err);
    }  
}); */

module.exports = controller;