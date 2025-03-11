require('dotenv').config();
const path = require('path');
const { app } = require('electron');
const sqlite3 = require('sqlite3').verbose();


const dbPath = process.env.DB_PATH.includes(':')
    ? process.env.DB_PATH
    : path.join(app.getPath('userData'), process.env.DB_PATH);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error connecting to SQLite:', err.message);
    else console.log('Connected to SQLite:', dbPath);
});


db.run("PRAGMA foreign_keys = ON;");

module.exports = db;
