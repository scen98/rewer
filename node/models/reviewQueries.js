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
exports.selectFollowedReviewsQuery = exports.selectDetailedReviewByUserAndMovieQuery = exports.selectReviewsByUserQuery = exports.selectDetailedReviewsByMovieQuery = exports.doesReviewExistQuery = exports.deleteReviewQuery = exports.selectReviewQuery = exports.updateReviewQuery = exports.insertReviewQuery = void 0;
var review_1 = require("../../common/review");
var reviewLikeQueries_1 = require("./reviewLikeQueries");
function insertReviewQuery(conn, review) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("INSERT INTO reviews (entryId, userName, text, score, date) VALUES (?, ?, ?, ?, ?)", [review.entryId, review.userName, review.text, review.score, review.date])];
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
exports.insertReviewQuery = insertReviewQuery;
function updateReviewQuery(conn, review) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("UPDATE reviews SET text = ?, score = ? WHERE id = ?", [review.text, review.score, review.id])];
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
exports.updateReviewQuery = updateReviewQuery;
function selectReviewQuery(conn, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT * FROM reviews WHERE id = ?")];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0][0]];
            }
        });
    });
}
exports.selectReviewQuery = selectReviewQuery;
function deleteReviewQuery(conn, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("DELETE FROM reviews WHERE id = ?", [id])];
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
exports.deleteReviewQuery = deleteReviewQuery;
function doesReviewExistQuery(conn, review) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT COUNT(id) as reviewCount FROM reviews WHERE userName = ? AND entryId = ?", [review.userName, review.entryId])];
                case 1:
                    result = _a.sent();
                    if (result[0].length < 1) {
                        return [2 /*return*/, false];
                    }
                    if (result[0][0].reviewCount > 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
exports.doesReviewExistQuery = doesReviewExistQuery;
function selectDetailedReviewsByMovieQuery(conn, movieId, requester, limit, offset, orderby) {
    return __awaiter(this, void 0, void 0, function () {
        var order, result, detailedReviews, likes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = "reviews.date";
                    if (orderby === review_1.EReviewOrderBy.popIndex) {
                        order = "SUM(reviewLikes.value)";
                    }
                    return [4 /*yield*/, conn.query("SELECT reviews.id, reviews.userName, reviews.text, reviews.date, reviews.score, users.nickName, SUM(reviewLikes.value) as popIndex FROM reviews LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId INNER JOIN users ON reviews.userName = users.userName WHERE reviews.entryId = ? GROUP BY reviews.id ORDER BY " + order + " DESC LIMIT ? OFFSET ?;", [movieId, limit, offset])];
                case 1:
                    result = _a.sent();
                    detailedReviews = result[0];
                    if (requester == null || requester === "") {
                        return [2 /*return*/, detailedReviews];
                    }
                    if (detailedReviews.length < 1) {
                        return [2 /*return*/, detailedReviews];
                    }
                    return [4 /*yield*/, reviewLikeQueries_1.selectReviewLikesByReviewsQuery(conn, detailedReviews.map(function (r) { return r.id; }), requester)];
                case 2:
                    likes = _a.sent();
                    return [2 /*return*/, mergeWithReviewLikes(detailedReviews, likes, requester)];
            }
        });
    });
}
exports.selectDetailedReviewsByMovieQuery = selectDetailedReviewsByMovieQuery;
function selectReviewsByUserQuery(conn, userName, requester, limit, offset, orderby) {
    return __awaiter(this, void 0, void 0, function () {
        var orderString, result, reviews, likes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderString = orderby === review_1.EReviewOrderBy.popIndex ? "SUM(reviewLikes.value)" : "date";
                    return [4 /*yield*/, conn.query("SELECT reviews.id, reviews.userName, reviews.text, reviews.date, reviews.score, reviews.entryId, entries.type as entryType, entries.title as entryTitle, SUM(reviewLikes.value) as popIndex, series.title as seriesTitle, series.id as seriesId FROM reviews LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId INNER JOIN users ON reviews.userName = users.userName INNER JOIN entries ON reviews.entryId = entries.id LEFT JOIN seasons ON entries.seasonId = seasons.id LEFT JOIN series ON seasons.seriesId = series.id WHERE reviews.userName = ? GROUP BY reviews.id ORDER BY " + orderString + " DESC LIMIT ? OFFSET ?;", [userName, limit, offset])];
                case 1:
                    result = _a.sent();
                    reviews = result[0];
                    if (result[0].length < 1) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, reviewLikeQueries_1.selectReviewLikesByReviewsQuery(conn, reviews.map(function (r) { return r.id; }), requester)];
                case 2:
                    likes = _a.sent();
                    return [2 /*return*/, mergeWithReviewLikes(reviews, likes, requester)];
            }
        });
    });
}
exports.selectReviewsByUserQuery = selectReviewsByUserQuery;
function mergeWithReviewLikes(reviews, reviewLikes, requester) {
    return reviews.map(function (review) {
        var reviewLike = reviewLikes.find(function (l) { return l.reviewId === review.id; });
        if (reviewLike == null) {
            reviewLike = { id: 0, reviewId: review.id, userName: requester, value: 0 };
        }
        return __assign(__assign({}, review), { popIndex: parseInt(review.popIndex), myLike: reviewLike });
    });
}
function selectDetailedReviewByUserAndMovieQuery(conn, userName, entryId, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("SELECT reviews.id, reviews.userName, reviews.text, reviews.date, reviews.score, users.nickName, reviewLikes.value, SUM(reviewLikes.value) as popIndex, series.id as seriesId, series.title as seriesTitle FROM reviews LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId INNER JOIN users ON reviews.userName = users.userName INNER JOIN entries ON reviews.entryId = entries.id LEFT JOIN seasons ON entries.seasonId = seasons.id LEFT JOIN series ON seasons.seriesId = series.id WHERE reviews.userName = ? AND reviews.entryId = ? GROUP BY reviews.id ORDER BY reviews.date DESC LIMIT ? OFFSET ?;", [userName, entryId, limit, offset])];
                case 1:
                    result = _a.sent();
                    if (result[0][0] == null) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, __assign(__assign({}, result[0][0]), { entryId: entryId, popIndex: parseInt(result[0][0].popIndex) })];
            }
        });
    });
}
exports.selectDetailedReviewByUserAndMovieQuery = selectDetailedReviewByUserAndMovieQuery;
function selectFollowedReviewsQuery(conn, requester, limit, offset) {
    return __awaiter(this, void 0, void 0, function () {
        var reviews, result, likes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reviews = [];
                    return [4 /*yield*/, conn.query("SELECT follows.followed as userName, reviews.id, entries.type as entryType, reviews.entryId as entryId, reviews.date, reviews.score, reviews.text, entries.title as entryTitle, users.nickName, SUM(reviewLikes.value) as popIndex, series.title as seriesTitle, series.id as seriesId FROM follows INNER JOIN reviews ON follows.followed = reviews.userName INNER JOIN entries ON reviews.entryId = entries.id INNER JOIN users ON follows.followed = users.userName LEFT JOIN seasons ON entries.seasonId = seasons.id LEFT JOIN series ON seasons.seriesId = series.id LEFT JOIN reviewLikes ON reviews.id = reviewLikes.reviewId WHERE follows.follower = ? GROUP BY reviews.id ORDER BY reviews.date DESC LIMIT ? OFFSET ? ;", [requester, limit, offset])];
                case 1:
                    result = _a.sent();
                    if (result[0].length > 0) {
                        reviews = result[0];
                    }
                    else {
                        return [2 /*return*/, result[0]];
                    }
                    return [4 /*yield*/, reviewLikeQueries_1.selectReviewLikesByReviewsQuery(conn, reviews.map(function (s) { return s.id; }), requester)];
                case 2:
                    likes = _a.sent();
                    return [2 /*return*/, mergeWithReviewLikes(reviews, likes, requester)];
            }
        });
    });
}
exports.selectFollowedReviewsQuery = selectFollowedReviewsQuery;
