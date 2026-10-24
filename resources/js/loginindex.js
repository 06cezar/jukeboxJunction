// link-ul Log in / Log out din meniu, pe toate paginile.
// DOMContentLoaded (nu window.onload), ca sa nu inlocuiasca window.onload din script.js sau login.js

// scrie "Log in" sau "Log out" in meniu, dupa starea de acum.
// O apeleaza si login.js dupa login/logout, ca meniul sa se schimbe pe loc
function updateLoginLink() {
    const isLoggedIn = localStorage.getItem("loggedInUser") !== null; // logat = avem numele userului salvat
    document.getElementById("login").textContent = isLoggedIn ? "Log out" : "Log in";
}

document.addEventListener("DOMContentLoaded", function() {
    localStorage.removeItem("isLoggedIn"); // cheie veche, nu mai e folosita (starea e doar in loggedInUser)
    updateLoginLink();

    document.getElementById("login").addEventListener("click", () => {
      // starea se citeste la click, nu la incarcarea paginii, ca sa fie corecta si dupa un login facut pe aceeasi pagina
      if (localStorage.getItem("loggedInUser") !== null) {
        localStorage.removeItem("loggedInUser");
        updateLoginLink();
      }
    });
});
