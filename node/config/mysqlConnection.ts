const mysql = require('mysql2/promise');

export const connectInfo = {
    host: 'mi3-ss57.a2hosting.com',
    user: 'szbeneu_rewer',
    database: 'szbeneu_rew',
    password: 'RewerNode'
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