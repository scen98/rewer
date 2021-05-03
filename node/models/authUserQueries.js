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
exports.updatePermissionQuery = exports.deleteUserQuery = exports.insertPermissionQuery = exports.updatePasswordQuery = exports.updateSessionQuery = exports.insertAuthUserQuery = exports.selectAuthUserQuery = void 0;
function selectAuthUserQuery(con, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query('SELECT users.userName, users.nickName, users.password, users.session, userPermissions.level as permission FROM users INNER JOIN userPermissions on users.userName = userPermissions.userName WHERE users.userName = ?', [userName])];
                case 1:
                    result = _a.sent();
                    if (result[0].length < 1) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, result[0][0]];
            }
        });
    });
}
exports.selectAuthUserQuery = selectAuthUserQuery;
function insertAuthUserQuery(con, authUser) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("INSERT INTO users (userName, nickName, password, session) VALUES (?, ?, ?, ?);", [authUser.userName, authUser.nickName, authUser.password, authUser.session])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.insertAuthUserQuery = insertAuthUserQuery;
function updateSessionQuery(con, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var crypto, session, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    crypto = require('crypto');
                    session = crypto.createHash('md5').update(Math.random().toString(36).substring(10)).digest("hex");
                    return [4 /*yield*/, con.query("UPDATE users SET session = ? WHERE userName = ?", [session, userName])];
                case 1:
                    result = _a.sent();
                    if (result[0].affectedRows > 0) {
                        return [2 /*return*/, session];
                    }
                    else {
                        return [2 /*return*/, ""];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateSessionQuery = updateSessionQuery;
function updatePasswordQuery(con, userName, password) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("UPDATE users SET password = ? WHERE userName = ?", [password, userName])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.updatePasswordQuery = updatePasswordQuery;
function insertPermissionQuery(con, userName, level) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("INSERT INTO userPermissions (userName, level) VALUES (?, ?)", [userName, level])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.insertPermissionQuery = insertPermissionQuery;
function deleteUserQuery(con, userName) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, con.query("DELETE FROM users WHERE userName = ?", [userName])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
exports.deleteUserQuery = deleteUserQuery;
function updatePermissionQuery(conn, permission) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, conn.query("UPDATE userPermissions set level = ? WHERE userName = ?", [permission.level, permission.userName])];
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
exports.updatePermissionQuery = updatePermissionQuery;
