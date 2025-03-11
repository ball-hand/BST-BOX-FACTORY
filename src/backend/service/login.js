const dbm = require ('../models/modelAdmin');

function login(username, password, callback) {
  dbm.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err) return callback(err, null);
    if (row) return callback(null, { success: true, user: row });
    callback(null, { success: false, message: "Login gagal! Username atau password salah." });
  });
}

function logout(callback) {
  callback(null, { success: true, message: "Logout berhasil!" });
}

module.exports = { login, logout };
