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
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectDetailedSeries = exports.deleteSeries = exports.updateSeries = exports.insertEpisode = exports.insertSeries = void 0;
var entryQueries_1 = require("../models/entryQueries");
var previewSeries_1 = require("../models/previewSeries");
var seriesQueries_1 = require("../models/seriesQueries");
var midutils_1 = require("./midutils");
function insertSeries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!midutils_1.isUserMod(req))
                        return [2 /*return*/, midutils_1.return403(res, "Permission level 2 or higher is required for this action.")];
                    if (!midutils_1.validateProperties(res, req.body, ["title"]))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var newId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, seriesQueries_1.insertSeriesQuery(conn, req.body)];
                                    case 1:
                                        newId = _a.sent();
                                        if (newId) {
                                            return [2 /*return*/, midutils_1.returnInsert(res, newId)];
                                        }
                                        return [2 /*return*/, midutils_1.return500(res)];
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
exports.insertSeries = insertSeries;
function insertEpisode(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!midutils_1.isUserMod(req))
                        return [2 /*return*/, midutils_1.return403(res, "Permission level 2 or higher is required for this action.")];
                    if (!midutils_1.validateProperties(res, req.body, ["title"]))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var newId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, entryQueries_1.insertEntryQuery(conn, req.body, entryQueries_1.EEntryType.Episode)];
                                    case 1:
                                        newId = _a.sent();
                                        if (newId) {
                                            return [2 /*return*/, midutils_1.returnInsert(res, newId)];
                                        }
                                        return [2 /*return*/, midutils_1.return500(res)];
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
exports.insertEpisode = insertEpisode;
function updateSeries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!midutils_1.isUserMod(req))
                        return [2 /*return*/, midutils_1.return403(res, "Permission level 2 or higher is required for this action.")];
                    if (req.body.id == null)
                        return [2 /*return*/, midutils_1.returnMissingRequest(res, ["id"])];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, seriesQueries_1.updateSeriesQuery(conn, req.body)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, midutils_1.return200(res, "Series with id " + req.body.id + " was updated successfully.")];
                                        }
                                        return [2 /*return*/, midutils_1.return500(res)];
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
exports.updateSeries = updateSeries;
function deleteSeries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!midutils_1.isUserMod(req))
                        return [2 /*return*/, midutils_1.return403(res, "Permission level 2 or higher is required for this action.")];
                    if (req.body.id == null)
                        return [2 /*return*/, midutils_1.returnMissingRequest(res, ["id"])];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, seriesQueries_1.deleteSeriesQuery(conn, req.body.id)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, midutils_1.return200(res, "Series with id " + req.body.id + " was updated successfully.")];
                                        }
                                        return [2 /*return*/, midutils_1.return500(res)];
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
exports.deleteSeries = deleteSeries;
function selectDetailedSeries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.body.id == null)
                        return [2 /*return*/, midutils_1.returnMissingRequest(res, ["id"])];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, seriesQueries_1.selectDetailedSeriesQuery(conn, req.body.id)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, midutils_1.returnData(res, result)];
                                        }
                                        return [2 /*return*/, midutils_1.return500(res)];
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
exports.selectDetailedSeries = selectDetailedSeries;
function selectLatestPreviewSeries(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var limiter;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limiter = midutils_1.getLimiter(req.body.limit, req.body.offset);
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, previewSeries_1.selectLatestPreviewSeriesQuery(conn, limiter.limit, limiter.offset)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, midutils_1.returnData(res, result)];
                                        }
                                        return [2 /*return*/, midutils_1.return500(res)];
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
exports.default = selectLatestPreviewSeries;
