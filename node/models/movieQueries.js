"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.mergeMovies = exports.selectLatestMoviesByGenreQuery = exports.selectMoviesByKeywordQuery = exports.selectDetailedMoviesBySeasonsQuery = exports.selectDetailedMoviesByScoreQuery = exports.selectUpcomingMoviesQuery = exports.selectLatestMoviesQuery = void 0;
var castQueries_1 = require("./castQueries");
var genreQueries_1 = require("./genreQueries");
function selectLatestMoviesQuery(conn, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 1 GROUP BY entries.id ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, limit, offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, moviesFactory(conn, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectLatestMoviesQuery = selectLatestMoviesQuery;
function selectUpcomingMoviesQuery(conn, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate > ? AND entries.type = 1 GROUP BY entries.id ORDER BY entries.releaseDate LIMIT ? OFFSET ?", [today, limit, offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, moviesFactory(conn, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectUpcomingMoviesQuery = selectUpcomingMoviesQuery;
function selectDetailedMoviesByScoreQuery(conn, min, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 1 GROUP BY entries.id HAVING avgScore >= ? ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, min, limit, offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, moviesFactory(conn, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectDetailedMoviesByScoreQuery = selectDetailedMoviesByScoreQuery;
function selectDetailedMoviesBySeasonsQuery(conn, seasonIds) {
    return __awaiter(this, void 0, void 0, function () {
        var result, detailedMovies, casts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore, entries.seasonId FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.seasonId IN (?) GROUP BY entries.id ORDER BY entries.releaseDate DESC", [seasonIds])];
                case 1:
                    result = _a.sent();
                    detailedMovies = result[0];
                    if (detailedMovies.length < 1 || detailedMovies == null) {
                        return [2 /*return*/, detailedMovies];
                    }
                    return [4 /*yield*/, castQueries_1.selectCastsByEntriesQuery(conn, detailedMovies.map(function (m) { return m.id; }))];
                case 2:
                    casts = _a.sent();
                    return [2 /*return*/, mergeMovies(detailedMovies, casts, [])];
            }
        });
    });
}
exports.selectDetailedMoviesBySeasonsQuery = selectDetailedMoviesBySeasonsQuery;
function selectMoviesByKeywordQuery(conn, keyword, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.seasonId, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.type = 1 AND entries.title LIKE CONCAT('%',?,'%') GROUP BY entries.id LIMIT ?", [keyword, limit])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.selectMoviesByKeywordQuery = selectMoviesByKeywordQuery;
function selectLatestMoviesByGenreQuery(conn, genreId, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, AVG(reviews.score) as avgScore FROM entryGenres INNER JOIN entries ON entryGenres.entryId = entries.id LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entryGenres.genreId = ? AND entries.type = 1 AND entries.releaseDate <= ? GROUP BY entries.id ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [genreId, today, limit, offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, moviesFactory(conn, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectLatestMoviesByGenreQuery = selectLatestMoviesByGenreQuery;
function moviesFactory(con, detailedMovies) {
    return __awaiter(this, void 0, void 0, function () {
        var movieIds, casts, movieGenres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (detailedMovies.length === 0)
                        return [2 /*return*/, []]; //no need to waste time for other queries  
                    movieIds = detailedMovies.map(function (m) { return m.id; });
                    return [4 /*yield*/, castQueries_1.selectCastsByEntriesQuery(con, movieIds)];
                case 1:
                    casts = _a.sent();
                    return [4 /*yield*/, genreQueries_1.selectEntryGenresByEntriesQuery(con, movieIds)];
                case 2:
                    movieGenres = _a.sent();
                    return [2 /*return*/, mergeMovies(detailedMovies, casts, movieGenres)];
            }
        });
    });
}
function mergeMovies(detailedMovies, casts, movieGenres) {
    return detailedMovies.map(function (movie) {
        return __assign(__assign({}, movie), { casts: casts.filter(function (c) { return c.entryId === movie.id; }), genres: movieGenres.filter(function (g) { return g.entryId === movie.id; }), avgScore: typeof movie.avgScore === "string" ? parseFloat(movie.avgScore) : null //ts used to scream without unknown so im leaving it for now
         });
    });
}
exports.mergeMovies = mergeMovies;
