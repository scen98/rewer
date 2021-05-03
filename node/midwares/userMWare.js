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
exports.login = exports.selectDetailedUser = exports.selectFollowedUsers = exports.selectFollowers = exports.signUp = exports.updatePasswordRequest = exports.updatePermission = exports.updateUserInfo = exports.doesExist = void 0;
var authUserQueries_1 = require("../models/authUserQueries");
var midutils_1 = require("./midutils");
var detailedUserQueries_1 = require("../models/detailedUserQueries");
var userQueries_1 = require("../models/userQueries");
function doesExist(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = { exists: false };
                    if (!req.body.userName) {
                        return [2 /*return*/, midutils_1.returnData(res, response)];
                    }
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, authUserQueries_1.selectAuthUserQuery(conn, req.body.userName)];
                                    case 1:
                                        user = _a.sent();
                                        if (user != null) {
                                            return [2 /*return*/, midutils_1.returnData(res, { exists: true })];
                                        }
                                        return [2 /*return*/, midutils_1.returnData(res, response)];
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
exports.doesExist = doesExist;
function updateUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.session.user == null || req.session.user.userName == null) {
                        return [2 /*return*/, midutils_1.return403(res)];
                    }
                    if (req.session.user.userName !== req.body.userName) {
                        return [2 /*return*/, midutils_1.return403(res)];
                    }
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, detailedUserQueries_1.updateUserQuery(conn, req.body)];
                                    case 1:
                                        result = _a.sent();
                                        if (result.serverStatus === 2 && result.affectedRows > 0) {
                                            return [2 /*return*/, midutils_1.returnData(res, { affectedRecords: result.affectedRows })];
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
exports.updateUserInfo = updateUserInfo;
function updatePermission(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (req.session == null || req.session.user == null || req.session.user.permission < 2)
                        return [2 /*return*/, midutils_1.return403(res, "This action requires permission level of 2 or higher.")];
                    if (req.body.userName == null)
                        return [2 /*return*/, midutils_1.returnMissingRequest(res, ["id"])];
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, authUserQueries_1.updatePermissionQuery(conn, req.body)];
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
exports.updatePermission = updatePermission;
function updatePasswordRequest(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function update(conn) {
            return __awaiter(this, void 0, void 0, function () {
                var bycript, validUser, isValid, result, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            bycript = require("bcrypt");
                            return [4 /*yield*/, authUserQueries_1.selectAuthUserQuery(conn, req.body.authUser.userName)];
                        case 1:
                            validUser = _c.sent();
                            if (!validUser) {
                                return [2 /*return*/, midutils_1.return404(res)];
                            }
                            return [4 /*yield*/, bycript.compare(req.body.authUser.password, validUser.password)];
                        case 2:
                            isValid = _c.sent();
                            if (!isValid) {
                                return [2 /*return*/, midutils_1.return403(res)];
                            }
                            _a = authUserQueries_1.updatePasswordQuery;
                            _b = [conn, req.body.authUser.userName];
                            return [4 /*yield*/, bycript.hash(req.body.newPassword, 10)];
                        case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                        case 4:
                            result = _c.sent();
                            if (result.affectedRows > 0) {
                                return [2 /*return*/, midutils_1.return200(res)];
                            }
                            else {
                                return [2 /*return*/, midutils_1.return403(res)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.session.user) {
                        return [2 /*return*/, midutils_1.return403(res)];
                    }
                    if (req.session.user.userName !== req.body.authUser.userName) {
                        return [2 /*return*/, midutils_1.return403(res)];
                    }
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, update(conn)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (err) {
                            midutils_1.returnError(res, err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updatePasswordRequest = updatePasswordRequest;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function onUserAdd(conn) {
            return __awaiter(this, void 0, void 0, function () {
                var permissionLevel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            permissionLevel = 2;
                            return [4 /*yield*/, authUserQueries_1.insertPermissionQuery(conn, req.body.userName, permissionLevel)];
                        case 1:
                            if (!((_a.sent()).affectedRows > 0)) return [3 /*break*/, 2];
                            return [2 /*return*/, midutils_1.return201(res)];
                        case 2: return [4 /*yield*/, authUserQueries_1.deleteUserQuery(conn, req.body.userName)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, midutils_1.return500(res)];
                    }
                });
            });
        }
        var bycript;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bycript = require("bcrypt");
                    if (!midutils_1.validateProperties(res, req.body, ["userName", "password", "nickName"]))
                        return [2 /*return*/, false];
                    if (req.body.userName.length < 6) {
                        return [2 /*return*/, midutils_1.return400(res, "Username must be at least 5 characters long.")];
                    }
                    if (req.body.password.length < 6) {
                        return [2 /*return*/, midutils_1.return400(res, "Password must be at least 5 characters long.")];
                    }
                    if (req.body.userName.length > 255 || req.body.nickName.length > 300) {
                        return [2 /*return*/, midutils_1.return400(res, "String limit exceeds the given limit.")];
                    }
                    return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                            var hashedPassword, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bycript.hash(req.body.password, 10)];
                                    case 1:
                                        hashedPassword = _a.sent();
                                        return [4 /*yield*/, authUserQueries_1.insertAuthUserQuery(conn, __assign(__assign({}, req.body), { password: hashedPassword }))];
                                    case 2:
                                        result = _a.sent();
                                        if (!(result.serverStatus === 2 && result.affectedRows > 0)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, onUserAdd(conn)];
                                    case 3: return [2 /*return*/, _a.sent()];
                                    case 4: return [2 /*return*/, midutils_1.return500(res)];
                                }
                            });
                        }); }, function (err) {
                            midutils_1.returnError(res, err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.signUp = signUp;
function selectFollowers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                        var request, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    request = req.body;
                                    midutils_1.nullCheckLimit(request);
                                    return [4 /*yield*/, userQueries_1.selectFollowersQuery(conn, request)];
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
exports.selectFollowers = selectFollowers;
function selectFollowedUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                        var request, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    request = req.body;
                                    midutils_1.nullCheckLimit(request);
                                    return [4 /*yield*/, userQueries_1.selectFollowedUsersQuery(conn, request)];
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
exports.selectFollowedUsers = selectFollowedUsers;
function selectDetailedUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, midutils_1.withMysql(function (conn) { return __awaiter(_this, void 0, void 0, function () {
                        var requester, detailedUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    requester = "";
                                    if (req.session != null && req.session.user != null) {
                                        requester = req.session.user.userName;
                                    }
                                    return [4 /*yield*/, detailedUserQueries_1.selectDetailedUserQuery(conn, req.body.userName, requester)];
                                case 1:
                                    detailedUser = _a.sent();
                                    if (detailedUser) {
                                        return [2 /*return*/, midutils_1.returnData(res, detailedUser)];
                                    }
                                    return [2 /*return*/, midutils_1.return404(res)];
                            }
                        });
                    }); }, function (err) {
                        midutils_1.returnError(res, err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.selectDetailedUser = selectDetailedUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, midutils_1.withMysql(function (con) { return __awaiter(_this, void 0, void 0, function () {
                        var bycript, user, isLoginSuccessful, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    bycript = require("bcrypt");
                                    return [4 /*yield*/, authUserQueries_1.selectAuthUserQuery(con, req.body.authUser.userName)];
                                case 1:
                                    user = _b.sent();
                                    if (user.permission < 1) {
                                        return [2 /*return*/, midutils_1.return403(res, "Permission must be higher than 0.")];
                                    }
                                    return [4 /*yield*/, bycript.compare(req.body.authUser.password, user.password)];
                                case 2:
                                    isLoginSuccessful = _b.sent();
                                    if (!isLoginSuccessful)
                                        return [2 /*return*/, midutils_1.return403(res)];
                                    if (!req.body.autoLogin) return [3 /*break*/, 4];
                                    _a = user;
                                    return [4 /*yield*/, authUserQueries_1.updateSessionQuery(con, user.userName)];
                                case 3:
                                    _a.session = _b.sent();
                                    _b.label = 4;
                                case 4:
                                    req.session.user = user;
                                    return [2 /*return*/, midutils_1.returnData(res, user)];
                            }
                        });
                    }); }, function (err) {
                        midutils_1.returnError(res, err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function isLoggedIn(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = { isLoggedin: false, setNewSession: false };
                    try {
                        if (checkForActiveSession(req, res, response))
                            return [2 /*return*/, true];
                        if (req.body.session == null) {
                            return [2 /*return*/, midutils_1.returnData(res, response)];
                        }
                    }
                    catch (err) {
                        return [2 /*return*/, midutils_1.returnError(res, err)];
                    }
                    return [4 /*yield*/, checkForValidSessionToken(req, res, response)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, response.isLoggedin];
            }
        });
    });
}
exports.default = isLoggedIn;
function checkForActiveSession(req, res, response) {
    if (req.session.user == null) {
        return false;
    }
    if (req.session.user.userName && req.session.user.userName === req.body.userName) {
        response.isLoggedin = true;
        return midutils_1.returnData(res, response);
    }
}
function checkForValidSessionToken(req, res, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, midutils_1.withMysql(function (con) { return __awaiter(_this, void 0, void 0, function () {
                        var validUser;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, authUserQueries_1.selectAuthUserQuery(con, req.body.userName)];
                                case 1:
                                    validUser = _b.sent();
                                    if (!(validUser.session === req.body.session)) return [3 /*break*/, 3];
                                    _a = { isLoggedin: true, setNewSession: true };
                                    return [4 /*yield*/, authUserQueries_1.updateSessionQuery(con, req.body.userName)];
                                case 2:
                                    response = (_a.newSession = _b.sent(), _a);
                                    req.session.user = __assign(__assign({}, validUser), { session: response.newSession });
                                    _b.label = 3;
                                case 3: return [2 /*return*/, midutils_1.returnData(res, response)];
                            }
                        });
                    }); }, function (err) {
                        midutils_1.returnError(res, err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
