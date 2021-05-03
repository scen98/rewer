"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSession = exports.sessionInfo = void 0;
var mysqlConnection_1 = require("./mysqlConnection");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(mysqlConnection_1.connectInfo);
exports.sessionInfo = {
    key: "user-session",
    secret: "JMMcWFZu92Tqvd22B7RTS4tqq8YBpZn6L9MYgBuY3AFTBM4EnkcARNDeHDW4Vt5n9Na9srxE6TXARsNFn4F55NAPLA3BqnGyB9q4",
    resave: false,
    saveUnitialized: false,
    store: sessionStore
};
function userSession() {
    return session(exports.sessionInfo);
}
exports.userSession = userSession;
