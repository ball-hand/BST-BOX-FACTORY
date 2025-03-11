const sqlite3 = require("sqlite3").verbose();
const path = require("path");


const dbPath = path.join(__dirname, "../database.sqlite");


const dbm = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Gagal terhubung ke database!", err);
  } else {
    console.log("Terhubung ke SQLite!");
  }
});


dbm.serialize(() => {
  dbm.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  dbm.get("SELECT * FROM users WHERE username = ?", ["admin"], (err, row) => {
    if (!row) {
      dbm.run("INSERT INTO users (username, password) VALUES (?, ?)", [
        "admin",
        "adminBST",
      ]);
      console.log("Admin user created.");
    }
  });
});

module.exports = dbm;
