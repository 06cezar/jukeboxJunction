window.onload = function() {
    const loginDiv = document.getElementById("login");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    loginDiv.textContent = isLoggedIn ? "Logout" : "Login";
  
    loginDiv.addEventListener("click", () => {
      if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", "false");
        loginDiv.textContent = "Login";
      } 
    });
}