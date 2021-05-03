"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToUnix = exports.unixToString = void 0;
function unixToString(unix) {
    var date = new Date(unix * 1000);
    return date.toISOString().split('T')[0];
}
exports.unixToString = unixToString;
function stringToUnix(dateString) {
    return Date.parse(dateString) / 1000;
}
exports.stringToUnix = stringToUnix;
