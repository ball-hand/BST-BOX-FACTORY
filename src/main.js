const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { login, logout } = require("./backend/auth");


let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join( __dirname + "/preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "frontend", "index.html"));
});

ipcMain.handle("login", async (_, username, password) => {
  return new Promise((resolve) => {
    login(username, password, (err, result) => {
      if (err) resolve({ success: false, message: "Error pada server!" });
      else resolve(result);
    });
  });
});

ipcMain.handle("logout", async () => {
  return logout((err, result) => (err ? { success: false } : result));
});
