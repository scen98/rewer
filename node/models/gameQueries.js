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
exports.mergeGames = exports.selectPlatformsQuery = exports.deleteGamePlatformQuery = exports.insertGamePlatformQuery = exports.selectGamePlatforms = exports.selectUpcomingGamesQuery = exports.selectLatestGamesQuery = exports.selectGamesByKeywordQuery = exports.selectGamesByScoreQuery = exports.selectDetailedGamesQuery = void 0;
var castQueries_1 = require("./castQueries");
var genreQueries_1 = require("./genreQueries");
function selectDetailedGamesQuery(con, ids) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, entries.trailer, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.id IN (?)", [ids])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, gamesFactory(con, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectDetailedGamesQuery = selectDetailedGamesQuery;
function selectGamesByScoreQuery(con, min, limiter) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, con.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.production, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 3 GROUP BY entries.id HAVING avgScore >= ? ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, min, limiter.limit, limiter.offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, gamesFactory(con, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectGamesByScoreQuery = selectGamesByScoreQuery;
function selectGamesByKeywordQuery(conn, keyword, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, AVG(reviews.score) as avgScore FROM entries INNER JOIN reviews ON entries.id = reviews.entryId WHERE entries.type = 3 AND entries.title LIKE CONCAT('%',?,'%') GROUP BY entries.id LIMIT ?", [keyword, limit])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.selectGamesByKeywordQuery = selectGamesByKeywordQuery;
function selectLatestGamesQuery(conn, limiter) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate <= ? AND entries.type = 3 GROUP BY entries.id ORDER BY entries.releaseDate DESC LIMIT ? OFFSET ?", [today, limiter.limit, limiter.offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, gamesFactory(conn, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectLatestGamesQuery = selectLatestGamesQuery;
function selectUpcomingGamesQuery(conn, limiter) {
    return __awaiter(this, void 0, void 0, function () {
        var today, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date().toISOString().split('T')[0];
                    return [4 /*yield*/, conn.query("SELECT entries.id, entries.title, entries.releaseDate, entries.summary, entries.runtime, entries.production, AVG(reviews.score) as avgScore FROM entries LEFT OUTER JOIN reviews ON entries.id = reviews.entryId WHERE entries.releaseDate > ? AND entries.type = 1 GROUP BY entries.id ORDER BY entries.releaseDate LIMIT ? OFFSET ?", [today, limiter.limit, limiter.offset])];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, gamesFactory(conn, result[0])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.selectUpcomingGamesQuery = selectUpcomingGamesQuery;
function selectGamePlatforms(con, gameIds) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("SELECT gamePlatforms.id as id, gamePlatforms.entryId, gamePlatforms.platformId, platforms.name as platformName FROM gamePlatforms JOIN platforms ON platforms.id = gamePlatforms.platformId WHERE gamePlatforms.entryId IN (?);", [gameIds])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.selectGamePlatforms = selectGamePlatforms;
function insertGamePlatformQuery(con, gamePlatform) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("INSERT INTO gamePlatforms (entryId, platformId) VALUES (?, ?);", [gamePlatform.entryId, gamePlatform.platformId])];
                case 1:
                    result = _a.sent();
                    if (result[0].insertId > 0) {
                        return [2 /*return*/, result[0].insertId];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
exports.insertGamePlatformQuery = insertGamePlatformQuery;
function deleteGamePlatformQuery(con, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("DELETE FROM gamePlatforms WHERE id = ?;", [id])];
                case 1:
                    result = _a.sent();
                    if (result[0].affectedRows > 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.deleteGamePlatformQuery = deleteGamePlatformQuery;
function selectPlatformsQuery(con) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("SELECT * FROM platforms")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.selectPlatformsQuery = selectPlatformsQuery;
function gamesFactory(conn, games) {
    return __awaiter(this, void 0, void 0, function () {
        var gameIds, casts, gameGenres, gamePlatforms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (games.length === 0)
                        return [2 /*return*/, []];
                    gameIds = games.map(function (m) { return m.id; });
                    return [4 /*yield*/, castQueries_1.selectCastsByEntriesQuery(conn, gameIds)];
                case 1:
                    casts = _a.sent();
                    return [4 /*yield*/, genreQueries_1.selectEntryGenresByEntriesQuery(conn, gameIds)];
                case 2:
                    gameGenres = _a.sent();
                    return [4 /*yield*/, selectGamePlatforms(conn, gameIds)];
                case 3:
                    gamePlatforms = _a.sent();
                    return [2 /*return*/, mergeGames(games, casts, gameGenres, gamePlatforms)];
            }
        });
    });
}
function mergeGames(detailedGames, casts, gameGenres, gamePlatforms) {
    return detailedGames.map(function (game) {
        return __assign(__assign({}, game), { casts: casts.filter(function (c) { return c.entryId === game.id; }), genres: gameGenres.filter(function (g) { return g.entryId === game.id; }), platforms: gamePlatforms.filter(function (p) { return p.entryId === game.id; }), avgScore: typeof game.avgScore === "string" ? parseFloat(game.avgScore) : null //ts used to scream without unknown so im leaving it for now
         });
    });
}
exports.mergeGames = mergeGames;
