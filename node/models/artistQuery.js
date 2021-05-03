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
exports.rereieveSeriesCasts = exports.retrieveMovieCasts = exports.selectDetailedArtistQuery = exports.deleteArtistQuery = exports.updateArtistQuery = exports.insertArtistQuery = exports.selectArtistQuer = exports.selectArtistsByKeywordQuery = void 0;
var castQueries_1 = require("./castQueries");
function selectArtistsByKeywordQuery(conn, keyword, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT * FROM artists WHERE name LIKE CONCAT('%',?,'%') LIMIT ? OFFSET ?;", [keyword, limit, offset])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.selectArtistsByKeywordQuery = selectArtistsByKeywordQuery;
function selectArtistQuer(conn, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT * FROM artists WHERE id = ?", [id])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0][0]];
            }
        });
    });
}
exports.selectArtistQuer = selectArtistQuer;
function insertArtistQuery(conn, artist) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("INSERT INTO artists (name, birthPlace, birthDate, deathPlace, deathDate, bio) VALUES (?, ?, ?, ?, ?, ?)", [artist.name, artist.birthPlace, artist.birthDate, artist.deathPlace, artist.deathDate, artist.bio])];
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
exports.insertArtistQuery = insertArtistQuery;
function updateArtistQuery(conn, artist) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("UPDATE artists SET name = ?, birthPlace = ?, birthDate = ?, deathPlace = ?, deathDate = ?, bio = ? WHERE id = ?", [artist.name, artist.birthPlace, artist.birthDate, artist.deathPlace, artist.deathDate, artist.bio, artist.id])];
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
exports.updateArtistQuery = updateArtistQuery;
function deleteArtistQuery(con, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("DELETE FROM artists WHERE id = ?", [id])];
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
exports.deleteArtistQuery = deleteArtistQuery;
function selectDetailedArtistQuery(conn, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, detailedArtist, casts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT * FROM artists WHERE id = ?", [id])];
                case 1:
                    result = _a.sent();
                    if (!(result[0].length > 0)) {
                        return [2 /*return*/, null];
                    }
                    detailedArtist = result[0][0];
                    return [4 /*yield*/, castQueries_1.selectArtistCastsByArtistQuery(conn, id)];
                case 2:
                    casts = _a.sent();
                    detailedArtist.entryCasts = retrieveMovieCasts(casts);
                    detailedArtist.seriesCasts = rereieveSeriesCasts(casts);
                    return [2 /*return*/, detailedArtist];
            }
        });
    });
}
exports.selectDetailedArtistQuery = selectDetailedArtistQuery;
function retrieveMovieCasts(unsortedCasts) {
    return unsortedCasts.filter(function (u) { return u.seriesId == null; });
}
exports.retrieveMovieCasts = retrieveMovieCasts;
function rereieveSeriesCasts(unsortedCasts) {
    var result = [];
    unsortedCasts.filter(function (c) { return c.seriesId > 0; }).forEach(function (ep) {
        manageEpisodeCast(ep, result);
    });
    return result;
}
exports.rereieveSeriesCasts = rereieveSeriesCasts;
function manageEpisodeCast(episodeCast, seriesCasts) {
    var existingSeriesCast = seriesCasts.find(function (c) { return c.seriesId === episodeCast.seriesId; });
    if (existingSeriesCast) {
        modifyExistingEpisodeCast(existingSeriesCast, episodeCast);
    }
    else {
        addNewEpisodeCast(seriesCasts, episodeCast);
    }
}
function addNewEpisodeCast(seriesCasts, episodeCast) {
    delete episodeCast.entryId;
    delete episodeCast.entryTitle;
    episodeCast.firstEpisodeDate = episodeCast.entryDate;
    delete episodeCast.entryDate;
    seriesCasts.push(__assign(__assign({}, episodeCast), { episodeCount: 1 }));
}
function modifyExistingEpisodeCast(existingSeriesCast, episodeCast) {
    if (new Date(existingSeriesCast.firstEpisodeDate) > new Date(episodeCast.releaseDate)) {
        existingSeriesCast = __assign(__assign({}, existingSeriesCast), { episodeCount: existingSeriesCast.episodeCount++, firstEpisodeDate: episodeCast.releaseDate });
    }
    else {
        existingSeriesCast = __assign(__assign({}, existingSeriesCast), { episodeCount: existingSeriesCast.episodeCount++ });
    }
}