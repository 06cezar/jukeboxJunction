// site-ul e static (GitHub Pages), deci formularul nu are un server la care sa trimita datele.
// oprim reincarcarea paginii si spunem sincer ca mesajul nu a plecat nicaieri
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector(".contact-form");
  const formOutput = document.getElementById("form-output");

  // mesajele afisate cand un camp nu trece validarea din HTML (required, pattern, minlength)
  const errorMessages = {
    name: "Enter Your Name Here (3-30 characters)",
    email: "Enter a valid email address (e.g. name@example.com)",
    phone: "Enter your phone number (+40712345678 or 0712345678)",
  };
  for (const [fieldName, message] of Object.entries(errorMessages)) {
    const field = contactForm.elements[fieldName];
    field.addEventListener("invalid", () => field.setCustomValidity(message));
    // cand userul scrie din nou, stergem mesajul ca browserul sa revalideze campul
    field.addEventListener("input", () => field.setCustomValidity(""));
  }

  // evenimentul de submit vine doar dupa ce trec validarile din HTML (required, pattern etc.)
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // fara asta, submit-ul doar reincarca pagina
    const data = new FormData(contactForm);
    formOutput.textContent = `Thanks, ${data.get("name").trim()}! This is a demo site, so your message wasn't actually sent.`;
    contactForm.reset();
  });
});
