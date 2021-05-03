import { connectInfo } from "./mysqlConnection";

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore(connectInfo);

export const sessionInfo = {
    key: "user-session",
    secret: "JMMcWFZu92Tqvd22B7RTS4tqq8YBpZn6L9MYgBuY3AFTBM4EnkcARNDeHDW4Vt5n9Na9srxE6TXARsNFn4F55NAPLA3BqnGyB9q4",
    resave: false,
    saveUnitialized: false,
    store: sessionStore
}

export function userSession(){
    return session(sessionInfo);
}