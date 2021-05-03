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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.connectInfo = void 0;
var mysql = require('mysql2/promise');
exports.connectInfo = {
    host: 'mi3-ss57.a2hosting.com',
    user: 'szbeneu_rewer',
    database: 'szbeneu_rew',
    password: 'RewerNode'
};
function getConnection() {
    var pool = mysql.createPool(__assign(__assign({}, exports.connectInfo), { waitForConnections: true, connectionLimit: 10, queueLimit: 0 }));
    return pool;
}
exports.getConnection = getConnection;
