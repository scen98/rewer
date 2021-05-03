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
exports.selectReviewsByUserAndMovie = exports.selectReviewsByMovie = exports.selectReviewsByUser = exports.updateReview = exports.updateReviewLike = exports.selectFollowedReviews = exports.insertReviewLike = exports.deleteReview = exports.insertReview = void 0;
var reviewLikeQueries_1 = require("../models/reviewLikeQueries");
var reviewQueries_1 = require("../models/reviewQueries");
var midutils_1 = require("./midutils");
function insertReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!midutils_1.validateProperties(res, req.body, ["entryId", "userName"]))
                        return [2 /*return*/, false];
                    if (!midutils_1.isUserLogged)
                        return [2 /*return*/, midutils_1.return403(res, "This action requires a running session on the server.")];
                    if (req.session.user.userName !== res.body.userName)
                        return [2 /*return*/, midutils_1.return403(res)];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var newId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewQueries_1.doesReviewExistQuery(conn, req.body)];
                                    case 1:
                                        if (_a.sent()) {
                                            return [2 /*return*/, midutils_1.return400(res, "Review already exists.")];
                                        }
                                        return [4 /*yield*/, reviewQueries_1.insertReviewQuery(conn, __assign(__assign({}, req.body), { date: new Date() }))];
                                    case 2:
                                        newId = _a.sent();
                                        if (!newId) return [3 /*break*/, 4];
                                        return [4 /*yield*/, reviewLikeQueries_1.insertReviewLikeQuery(conn, { id: 0, userName: req.session.user.userName, reviewId: newId, value: 1 })];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/, midutils_1.returnInsert(res, newId)];
                                    case 4: return [2 /*return*/, midutils_1.return500(res)];
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
exports.insertReview = insertReview;
function deleteReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.session == null || req.session.user == null)
                        return [2 /*return*/, midutils_1.return403(res)];
                    if (!midutils_1.validateProperties(res, req.body, ["id"]))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var validReview;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(req.session.user.permission < 2)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, reviewQueries_1.selectReviewQuery(conn, req.body.id)];
                                    case 1:
                                        validReview = _a.sent();
                                        if (validReview.userName !== req.session.user.userName)
                                            return [2 /*return*/, midutils_1.return403(res, "Only users with permission level of 2 or higher can remove other users' reviews.")];
                                        _a.label = 2;
                                    case 2: return [4 /*yield*/, reviewQueries_1.deleteReviewQuery(conn, req.body.id)];
                                    case 3:
                                        if (_a.sent()) {
                                            return [2 /*return*/, midutils_1.return200(res)];
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
exports.deleteReview = deleteReview;
function insertReviewLike(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (midutils_1.isUserLogged(req) && req.session.user.userName !== req.body.userName)
                        return [2 /*return*/, midutils_1.return403(res, "This action requires a running session on the server.")];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var newId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewLikeQueries_1.doesReviewLikeExistQuery(conn, req.body)];
                                    case 1:
                                        if (_a.sent()) {
                                            return [2 /*return*/, midutils_1.return400(res, "Reviewlike already exists.")];
                                        }
                                        return [4 /*yield*/, reviewLikeQueries_1.insertReviewLikeQuery(conn, req.body)];
                                    case 2:
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
exports.insertReviewLike = insertReviewLike;
function selectFollowedReviews(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var limiter;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limiter = midutils_1.getLimiter(req.body.limit, req.body.offset);
                    if (midutils_1.isUserLogged(req) && req.session.user.userName == null)
                        return [2 /*return*/, midutils_1.return403(res, "This request requires a logged in user.")];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewQueries_1.selectFollowedReviewsQuery(conn, req.session.user.userName, limiter.limit, limiter.offset)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, midutils_1.returnData(res, result)];
                                        }
                                        midutils_1.return500(res);
                                        return [2 /*return*/];
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
exports.selectFollowedReviews = selectFollowedReviews;
function updateReviewLike(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (midutils_1.isUserLogged(req) && req.session.user.userName !== req.body.userName)
                        return [2 /*return*/, midutils_1.return403(res)];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewLikeQueries_1.updateReviewLikeQuery(conn, req.body)];
                                    case 1:
                                        if (_a.sent()) {
                                            return [2 /*return*/, midutils_1.return200(res)];
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
exports.updateReviewLike = updateReviewLike;
function updateReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!midutils_1.validateProperties(res, req.body, ["id"]))
                        return [2 /*return*/, false];
                    if (midutils_1.isUserLogged(req) && req.session.user.userName !== req.body.userName)
                        return [2 /*return*/, midutils_1.return403(res, "This action requires a running session.")];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewQueries_1.updateReviewQuery(conn, req.body)];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, midutils_1.return200(res)];
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
exports.updateReview = updateReview;
function selectReviewsByUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var limiter, requester;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limiter = midutils_1.getLimiter(req.body.limit, req.body.offset);
                    if (!midutils_1.validateProperties(res, req.body, ["userName"]))
                        return [2 /*return*/, false];
                    requester = midutils_1.isUserLogged(req) ? req.session.user.userName : "";
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var reviews;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewQueries_1.selectReviewsByUserQuery(conn, req.body.userName, requester, limiter.limit, limiter.offset, req.body.orderby)];
                                    case 1:
                                        reviews = _a.sent();
                                        if (reviews) {
                                            return [2 /*return*/, midutils_1.returnData(res, reviews)];
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
exports.selectReviewsByUser = selectReviewsByUser;
function selectReviewsByMovie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var limiter, requester;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limiter = midutils_1.getLimiter(req.body.limit, req.body.offset);
                    requester = midutils_1.isUserLogged(req) ? req.session.user.userName : "";
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewQueries_1.selectDetailedReviewsByMovieQuery(conn, req.body.movieId, requester, limiter.limit, limiter.offset, req.body.orderby)];
                                    case 1:
                                        result = _a.sent();
                                        return [2 /*return*/, midutils_1.returnData(res, result)];
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
exports.selectReviewsByMovie = selectReviewsByMovie;
function selectReviewsByUserAndMovie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var limiter;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    limiter = midutils_1.getLimiter(req.body.limit, req.body.offset);
                    if (!midutils_1.validateProperties(res, req.body, ["userName", "movieId"]))
                        return [2 /*return*/, false];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var review;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, reviewQueries_1.selectDetailedReviewByUserAndMovieQuery(conn, req.body.userName, req.body.movieId, limiter.limit, limiter.offset)];
                                    case 1:
                                        review = _a.sent();
                                        if (review) {
                                            return [2 /*return*/, midutils_1.returnData(res, review)];
                                        }
                                        return [2 /*return*/, midutils_1.return404(res)];
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
exports.selectReviewsByUserAndMovie = selectReviewsByUserAndMovie;
