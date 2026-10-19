# Jukebox Junction

A static website for a fictional record store that sells vinyl, CDs and cassettes, plus a small "guess the song" game.

**Live site:** https://06cezar.github.io/jukeboxJunction/

Built with plain HTML, CSS and JavaScript. There is no framework, build step or backend.

## Features

**Home page** (`index.html`)
- About section, a grid of 10 best-selling albums and a contact section.
- Responsive navigation. On small screens it becomes a sidebar, made with CSS only (checkbox trick).
- Contact form with HTML validation (`required`, `pattern`, `minlength`) and custom error messages set from JavaScript.

**Album pages** (`thriller.html`, `blonde.html`, `grace.html`, ...)
- One page per best seller, with the cover, a short description and the tracklist. Recommended tracks are marked with ⭐.
- All album pages share one stylesheet (`album.css`).

**Game** (`game.html`)
- Pick an artist (Frank Ocean, Tyler, The Creator, Lana Del Rey or Michael Jackson). The game chooses a random song from their discography.
- Type a guess. Autocomplete suggests matching titles, and Enter or the **Guess!** button submits.
- Arrows show whether the answer is on a newer or older album and has a higher or lower track number. Yellow arrows mean you are within 2.
- Total wins and best score are saved in `localStorage`.
- Artist cards are buttons, so they work with the keyboard too.

**Login** (`login.html`)
- Checks the username and password against `resources/json/users.json`.
- A wrong attempt locks the form for 10 seconds.
- The logged-in user is kept in `localStorage` (`loggedInUser`). The game greets them by name.

> The login is a front-end demo only. The accounts in `users.json` are public, so don't reuse real passwords there.

## Project structure

```
index.html, game.html, login.html     main pages
<album>.html                          10 album pages
resources/
  css/
    base.css      shared colors, header, nav, footer, spinning vinyl (loaded first on every page)
    style.css     home page
    album.css     album pages
    game.css      game page
    login.css     login page
  js/
    script.js     game logic
    contact.js    contact form (validation messages, submit)
    login.js      login page
    loginindex.js Login/Logout link on the home page
  json/           discographies for the game (frank, tyler, lana, michael) and demo users
  img/            album covers and artist photos
  icons/, svg/    favicon, contact icons, header cursor
```

## Running locally

The game and the login load JSON files with `fetch`, so the site has to be served over HTTP. Opening the files directly (`file://`) won't work.

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

GitHub Pages builds the site from the `main` branch (repository root). Every push to `main` updates the live site within a minute or two.

## Credits

Album covers, artist photos and track names belong to their respective artists and labels. They are used here for a non-commercial project.
