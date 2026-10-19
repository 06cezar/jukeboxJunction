window.onload = function() {
    const loginDiv = document.getElementById("login");
    localStorage.removeItem("isLoggedIn"); // cheie veche, nu mai e folosita (starea e doar in loggedInUser)
    const isLoggedIn = localStorage.getItem("loggedInUser") !== null; // logat = avem numele userului salvat
    loginDiv.textContent = isLoggedIn ? "Logout" : "Login";

    loginDiv.addEventListener("click", () => {
      if (isLoggedIn) {
        localStorage.removeItem("loggedInUser");
        loginDiv.textContent = "Login";
      } 
    });
}