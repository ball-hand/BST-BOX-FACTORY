document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const message = document.getElementById("message");
  
    if (loginBtn) {
      loginBtn.addEventListener("click", async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
  
        const response = await window.electronAPI.login(username, password);
        if (response.success) {
          window.location.href = "dashboard.html";
        } else {
          message.innerText = "Login gagal!";
        }
      });
    }
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await window.electronAPI.logout();
        window.location.href = "index.html";
      });
    }
  });
  