const sqlite3 = require("sqlite3").verbose();

// Buat database SQLite
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) console.error("❌ Gagal konek SQLite:", err);
  else console.log("✅ Terhubung ke SQLite!");
});

// Buat tabel jika belum ada
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  
  db.get("SELECT * FROM users WHERE username = ?", ["admin"], (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
        "admin",
        "admin123", 
      ]);
    }
  });
});

module.exports = db;
