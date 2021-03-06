"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoComplete = void 0;
var articleQueries_1 = require("../models/articleQueries");
var artistQuery_1 = require("../models/artistQuery");
var detailedUserQueries_1 = require("../models/detailedUserQueries");
var previewSeries_1 = require("../models/previewSeries");
var midutils_1 = require("./midutils");
var movieQueries_1 = require("../models/movieQueries");
var gameQueries_1 = require("../models/gameQueries");
function mainSearch(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, limiter;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.body.keyword == null)
                        return [2 /*return*/, midutils_1.returnMissingRequest(res, ["keyword"])];
                    if (req.body.filter == null) {
                        filter = {
                            movies: true,
                            games: true,
                            series: true,
                            artists: true,
                            articles: true,
                            users: true
                        };
                    }
                    else {
                        filter = req.body.filter;
                    }
                    limiter = midutils_1.getLimiter(req.body.limit, 0);
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var movies, _a, games, _b, series, _c, artists, _d, users, _e, articles, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        if (!(filter.movies === true)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, movieQueries_1.selectMoviesByKeywordQuery(conn, req.body.keyword, limiter.limit)];
                                    case 1:
                                        _a = _g.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = [];
                                        _g.label = 3;
                                    case 3:
                                        movies = _a;
                                        if (!(filter.games === true)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, gameQueries_1.selectGamesByKeywordQuery(conn, req.body.keyword, limiter.limit)];
                                    case 4:
                                        _b = _g.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        _b = [];
                                        _g.label = 6;
                                    case 6:
                                        games = _b;
                                        if (!(filter.series === true)) return [3 /*break*/, 8];
                                        return [4 /*yield*/, previewSeries_1.selectPreviewSeriresByKeywordQuery(conn, req.body.keyword, limiter.limit, 0)];
                                    case 7:
                                        _c = _g.sent();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        _c = [];
                                        _g.label = 9;
                                    case 9:
                                        series = _c;
                                        if (!(filter.artists === true)) return [3 /*break*/, 11];
                                        return [4 /*yield*/, artistQuery_1.selectArtistsByKeywordQuery(conn, req.body.keyword, limiter.limit, 0)];
                                    case 10:
                                        _d = _g.sent();
                                        return [3 /*break*/, 12];
                                    case 11:
                                        _d = [];
                                        _g.label = 12;
                                    case 12:
                                        artists = _d;
                                        if (!(filter.users === true)) return [3 /*break*/, 14];
                                        return [4 /*yield*/, detailedUserQueries_1.selectUsersByKeywordQuery(conn, req.body.keyword, limiter.limit)];
                                    case 13:
                                        _e = _g.sent();
                                        return [3 /*break*/, 15];
                                    case 14:
                                        _e = [];
                                        _g.label = 15;
                                    case 15:
                                        users = _e;
                                        if (!(filter.articles === true)) return [3 /*break*/, 17];
                                        return [4 /*yield*/, articleQueries_1.selectLatestArticlesQuery(conn, req.body.keyword, limiter.limit, 0)];
                                    case 16:
                                        _f = _g.sent();
                                        return [3 /*break*/, 18];
                                    case 17:
                                        _f = [];
                                        _g.label = 18;
                                    case 18:
                                        articles = _f;
                                        return [2 /*return*/, midutils_1.returnData(res, { movies: movies, games: games, series: series, artists: artists, users: users, articles: articles })];
                                }
                            });
                        }); }, function (err) {
                            return midutils_1.returnError(res, err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = mainSearch;
function autoComplete(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, limiter;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.body.keyword == null)
                        return [2 /*return*/, midutils_1.returnMissingRequest(res, ["keyword"])];
                    if (req.body.filter == null) {
                        filter = {
                            movies: true,
                            games: true,
                            series: true,
                            artists: true,
                            articles: true,
                            users: true
                        };
                    }
                    else {
                        filter = req.body.filter;
                    }
                    limiter = midutils_1.getLimiter(req.body.limit, 0);
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var movies, _a, games, _b, series, _c, artists, _d, users, _e, articles, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        if (!(filter.movies === true)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, movieQueries_1.selectMoviesByKeywordQuery(conn, req.body.keyword, limiter.limit)];
                                    case 1:
                                        _a = (_g.sent()).map(function (m) { return m.title; });
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = [];
                                        _g.label = 3;
                                    case 3:
                                        movies = _a;
                                        if (!(filter.games === true)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, gameQueries_1.selectGamesByKeywordQuery(conn, req.body.keyword, limiter.limit)];
                                    case 4: return [4 /*yield*/, (_g.sent()).map(function (m) { return m.title; })];
                                    case 5:
                                        _b = (_g.sent());
                                        return [3 /*break*/, 7];
                                    case 6:
                                        _b = [];
                                        _g.label = 7;
                                    case 7:
                                        games = _b;
                                        if (!(filter.series === true)) return [3 /*break*/, 9];
                                        return [4 /*yield*/, previewSeries_1.selectPreviewSeriresByKeywordQuery(conn, req.body.keyword, limiter.limit, 0)];
                                    case 8:
                                        _c = (_g.sent()).map(function (s) { return s.title; });
                                        return [3 /*break*/, 10];
                                    case 9:
                                        _c = [];
                                        _g.label = 10;
                                    case 10:
                                        series = _c;
                                        if (!(filter.artists === true)) return [3 /*break*/, 12];
                                        return [4 /*yield*/, artistQuery_1.selectArtistsByKeywordQuery(conn, req.body.keyword, limiter.limit, 0)];
                                    case 11:
                                        _d = (_g.sent()).map(function (a) { return a.name; });
                                        return [3 /*break*/, 13];
                                    case 12:
                                        _d = [];
                                        _g.label = 13;
                                    case 13:
                                        artists = _d;
                                        if (!(filter.users === true)) return [3 /*break*/, 15];
                                        return [4 /*yield*/, detailedUserQueries_1.selectUsersByKeywordQuery(conn, req.body.keyword, limiter.limit)];
                                    case 14:
                                        _e = (_g.sent()).map(function (u) { return u.nickName; });
                                        return [3 /*break*/, 16];
                                    case 15:
                                        _e = [];
                                        _g.label = 16;
                                    case 16:
                                        users = _e;
                                        if (!(filter.articles === true)) return [3 /*break*/, 18];
                                        return [4 /*yield*/, articleQueries_1.selectLatestArticlesQuery(conn, req.body.keyword, limiter.limit, 0)];
                                    case 17:
                                        _f = (_g.sent()).map(function (a) { return a.title; });
                                        return [3 /*break*/, 19];
                                    case 18:
                                        _f = [];
                                        _g.label = 19;
                                    case 19:
                                        articles = _f;
                                        return [2 /*return*/, midutils_1.returnData(res, __spreadArrays(movies, games, series, artists, users, articles))];
                                }
                            });
                        }); }, function (err) {
                            return midutils_1.returnError(res, err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.autoComplete = autoComplete;
