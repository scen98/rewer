"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var midutils_1 = require("./midwares/midutils");
var search_1 = __importStar(require("./midwares/search"));
var express = require("express");
var path = require("path");
var app = express();
var port = 4000;
app.use(express.json());
var genres = require("./api/genreController");
var users = require("./api/userController");
var movies = require("./api/movieController");
var series = require("./api/seriesController");
var seasons = require("./api/seasonController");
var artists = require("./api/artistController");
var reviews = require("./api/reviewController");
var casts = require("./api/castController");
var follows = require("./api/followController");
var articles = require("./api/articleController");
var games = require("./api/gameController");
var backendPath = "/rewer/node";
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
app.post(backendPath + "/search", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, search_1.default(req, res)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post(backendPath + "/auto-complete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, search_1.autoComplete(req, res)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                midutils_1.returnError(res, err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
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
], function (req, res) {
    res.sendFile(path.join(__dirname, "./public", "index.html"));
});
//app.listen();
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
