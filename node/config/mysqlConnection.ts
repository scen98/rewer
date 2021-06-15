const mysql = require('mysql2/promise');

export const connectInfo = {
    host: 'de12.fcomet.com',
    user: 'szbencli_rewer',
    database: 'szbencli_rew',
    password: 'rewer90'
}

export function getConnection(){
    const pool = mysql.createPool({
    ...connectInfo,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });
    return pool;
}

export interface IMysqlResult{
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningStatus: number;
    changedRows: number;
}