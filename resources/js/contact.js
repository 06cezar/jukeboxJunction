// site-ul e static (GitHub Pages), deci formularul nu are un server la care sa trimita datele.
// oprim reincarcarea paginii si confirmam in pagina ca am primit mesajul
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector(".contact-form");
  const formOutput = document.getElementById("form-output");

  // evenimentul de submit vine doar dupa ce trec validarile din HTML (required, pattern etc.)
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // fara asta, submit-ul doar reincarca pagina
    const data = new FormData(contactForm);
    formOutput.textContent = `Thank you, ${data.get("name").trim()}! We'll get back to you at ${data.get("email")}.`;
    contactForm.reset();
  });
});
