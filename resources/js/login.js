window.onload = function() {
  const loginForm = document.querySelector(".login-form");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");
  const retryTimer = document.getElementById("retry-timer");
  const loginOutput = document.getElementById("login-output");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const style = getComputedStyle(loginButton);
  if (style.display === "none") {
    console.log("Login button is hidden");
  }
  
  // verific userul e deja logat
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    // daca userul e logat, ascundem butonul de login, il afisam pe cel de logout
    loginButton.style.display = "none";
    logoutButton.style.display = "inline-block";
    loginOutput.textContent = `You're already logged in as: ${loggedInUser}`;
  }
  function fetchUsers() {
    return fetch("resources/json/users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load users data");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        loginOutput.textContent = "Error fetching user data!";
        return null;
      });
  }
  // evenimentul de submit (login)
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    // validare cu regex
    const usernameRegex = /^[A-Za-z0-9]{3,}$/;
    const passwordRegex = /^[^\s]{8,}$/; // no spaces

    if (!usernameRegex.test(username)) {
      loginOutput.textContent = "Invalid username! Minimum 3 characters long. (lowercase and uppercase letters and numbers)";
      return;
    }
    if (!passwordRegex.test(password)) {
      loginOutput.textContent = "Invalid password! Minimum 8 characters long.";
      return;
    }
    fetchUsers().then((users) => {
      if (users) {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          localStorage.setItem("loggedInUser", username);
          localStorage.setItem("isLoggedIn", "true")
          alert("You logged in successfully!");
          setTimeout(() => {
            console.log("You have logged in.");
          }, 2000);
          loginOutput.textContent = "";
          loginButton.style.display = "none";
          logoutButton.style.display = "inline-block";
        } else {
          loginOutput.textContent = "Invalid username or password! Try again in 10 seconds.";
         
      loginButton.disabled = true; // dau disable
      lockoutCounter = 10; // resetez counter
      retryTimer.textContent = `You can retry in ${lockoutCounter} seconds.`;

      // incep countdown
      interval = setInterval(() => {
        lockoutCounter--;
        if (lockoutCounter <= 0) {
          clearInterval(interval);  // opresc countdown-ul
          retryTimer.textContent = "";
          loginOutput.textContent = "";
          loginButton.disabled = false; // dau reenable la buton
        } else {
          retryTimer.textContent = `You can retry in ${lockoutCounter} seconds.`;
        }
      }, 1000); // interval de o secunda
        }
      }
    });
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("You logged out!");
    localStorage.setItem("isLoggedIn", "false")
    setTimeout(() => {
      console.log("You have logged out.");
    }, 2000);
    // resetam formularul
    loginButton.style.display = "inline-block";
    logoutButton.style.display = "none";
    loginForm.reset();
    loginOutput.textContent = "";
  });
}
