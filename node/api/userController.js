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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sessionConfig_1 = require("../config/sessionConfig");
var express_1 = __importDefault(require("express"));
var midutils_1 = require("../midwares/midutils");
var userMWare_1 = __importStar(require("../midwares/userMWare"));
var multer = require("multer");
var controller = express_1.default.Router();
controller.use(express_1.default.json());
var sharp = require("sharp");
controller.use(sessionConfig_1.userSession());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../uploads/avatars");
    },
    filename: function (req, file, cb) {
        var error = null;
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg")
            error = new Error("Only png, jpg and jpeg are accepted formats.");
        if (req.session == null || req.session.user == null)
            error = new Error("No user is logged in.");
        if (file.size > 200000)
            error = new Error("File size exceeds the given limit (200000).");
        cb(error, req.session.user.userName + ".jpg");
    }
});
var upload = multer({ storage: storage });
controller.post("/upload_avatar", upload.single("avatar"), function (req, res) {
    try {
        saveFiles(req, res);
    }
    catch (err) {
        return midutils_1.returnError(res, err);
    }
});
//TODO i know its shit, but this has no async support
var saveFiles = function (req, res) {
    sharp(req.file.path).resize({ width: 150 }).toFile(__dirname + "/../uploads/avatars/small-" + req.file.originalname, function (err, resizeImage) {
        if (err) {
            midutils_1.returnError(res, err);
        }
    });
    sharp(req.file.path).resize({ width: 300 }).toFile(__dirname + "/../uploads/avatars/medium-" + req.file.originalname, function (err, resizeImage) {
        if (err) {
            midutils_1.returnError(res, err);
        }
    });
    midutils_1.return200(res);
};
controller.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.login(req, res)];
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
    });
});
controller.post("/is_logged_in", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.default(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    midutils_1.returnError(res, err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/update_password", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.updatePasswordRequest(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    midutils_1.returnError(res, err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/insert_user", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.signUp(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    midutils_1.returnError(res, err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/does_exist", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.doesExist(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    midutils_1.returnError(res, err_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/select_detailed_user", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.selectDetailedUser(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_6 = _a.sent();
                    midutils_1.returnError(res, err_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/update_user_info", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.updateUserInfo(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    midutils_1.returnError(res, err_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.get("/log_out", function (req, res) {
    try {
        req.session.destroy();
        return midutils_1.return200(res);
    }
    catch (_a) {
        return midutils_1.return500(res);
    }
});
controller.post("/select_followers", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.selectFollowers(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _a.sent();
                    midutils_1.returnError(res, err_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/select_followed_users", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.selectFollowedUsers(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_9 = _a.sent();
                    midutils_1.returnError(res, err_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
controller.post("/update_permission", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userMWare_1.updatePermission(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_10 = _a.sent();
                    midutils_1.returnError(res, err_10);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
/*
controller.post("/update_email", async function (req:any, res:any) {
    try{
        await updateEmail(req, res);
    } catch(err){
        returnError(res, err);
    }
}); */
module.exports = controller;
