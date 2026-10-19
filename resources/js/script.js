// starea jocului
let allTracks = []; // array cu toate piesele pt search filter
let albums; // va lua valoarea unui array de obiecte
let randomAlbumNr;
let randomTrackNr;
let triesNr = 0;
let correctSong;
let correctAlbum;
let loadingArtist; // artistul care se incarca acum (ignoram raspunsurile vechi daca se schimba artistul repede)
let pickedColor = null; // culoarea aleasa din color picker (null = folosim culoarea albumului)
const playerName = localStorage.getItem("loggedInUser") || "Player";

window.onload = function() {
  const savedArtist = localStorage.getItem("selectedArtist") || "tyler";
  loadArtist(savedArtist);
      const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');

searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase(); // facem filtrarea sa nu fie case-sensitive

  if (!query) {
    dropdown.style.display = 'none';
    return;
  }

  // Filter songs
  const filtered = allTracks.filter(song =>
    song.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    dropdown.style.display = 'none';
    return;
  }
  const limitedResults = filtered.slice(0, 5);

  let suggestionsHTML = '';
  limitedResults.forEach(song => {
    suggestionsHTML += `<div class="suggestion">${song}</div>`;
  });

  dropdown.innerHTML = suggestionsHTML;
  dropdown.style.display = 'block'; // afiseaza dropdown ul

  const suggestionDivs = dropdown.querySelectorAll('.suggestion');
  suggestionDivs.forEach(div => {
    div.addEventListener('click', () => {
      // pune cantecul apasat in dropdown
      searchInput.value = div.textContent;
      // ascunde dropdownul
      dropdown.style.display = 'none';
    });
  });
});

// butoanele jocului
document.getElementById('submitbtn').addEventListener('click', play);
document.getElementById('playAgainBtn').addEventListener('click', playAgain);

// Enter trimite ghicirea, la fel ca butonul Guess!
searchInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    dropdown.style.display = 'none';
    play();
  }
});

// ascunde dropdown-ul daca se apasa in afara
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) { // target
    dropdown.style.display = 'none';
  }
});

// listener-ul pt color picker se pune o singura data, la incarcarea paginii
const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', function() {
  pickedColor = colorPicker.value;
  const textElements = document.getElementsByClassName('albumDetails');
  for (let i = 0; i < textElements.length; i++) {
    // aplic culoarea
    textElements[i].style.color = pickedColor;
  }
});
const artistCards = document.querySelectorAll(".artist-card");

artistCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedArtist = card.id;
    localStorage.setItem("selectedArtist", selectedArtist);
    console.log(`Selected artist saved: ${selectedArtist}`);
    loadArtist(selectedArtist); // incarc piesele noului artist, fara refresh
  });
});
}
function loadArtist(artist)
{
  loadingArtist = artist;
  // marchez vizual artistul selectat
  const artistCards = document.querySelectorAll(".artist-card");
  artistCards.forEach((card) => {
    card.classList.toggle("selected", card.id === artist);
    card.setAttribute("aria-pressed", card.id === artist); // cititoarele de ecran anunta ce artist e ales
  });
  resetBoard();
  document.getElementById('output').innerText = 'Loading...';
  fetch(`resources/json/${artist}.json`)
      .then(response => response.json())
      .then(data => {
        if (artist !== loadingArtist) {
          return; // intre timp s-a ales alt artist
        }
        document.getElementById("searchInput").placeholder = "Type a song...";
        albums = data.discography; // datele din json (obiecte)
        allTracks = []; // golesc piesele artistului anterior
        let html = '';
        // iterez prin albume
        for (let albumIndex = 0; albumIndex < albums.length; albumIndex++) {
          const album = albums[albumIndex];
          const albumNumber = albumIndex + 1;

          // afisez informatiile despre albume
          html += `<h2>Album #${albumNumber}: ${album.title}</h2>`;
          html += `<img src="${album.image}" width="200"><br><br>`;

          // iterez prin track-uri
          html += '<ol>'; // lista ordonata pt piese
          for (let trackIndex = 0; trackIndex < album.tracks.length; trackIndex++) {
            const trackTitle = album.tracks[trackIndex];
            allTracks.push(trackTitle); // adaug titlul piesei in array
            const trackNumber = trackIndex + 1; // indicii de la 0 la length - 1
            html += `<li><strong>Track #${trackNumber}:</strong> ${trackTitle}</li>`;
          }
          html += '</ol><hr>';
        }
        console.log(albums);
        document.getElementById('output').innerHTML = html;
        pickRandomSong();
      })
      .catch(err => {
        console.error(err);
        document.getElementById('output').innerText = 'Failed to load data.';
      });
}
function pickRandomSong()
{
  randomAlbumNr = randomNr(albums.length); // nr random pt album (de la 1 la album nr ul ultimului album)
  console.log(randomAlbumNr);
  randomTrackNr = randomNr(albums[randomAlbumNr-1].tracks.length); // indicii array-ului sunt de la 0 - n-1
  console.log(randomTrackNr);
  correctSong = albums[randomAlbumNr-1].tracks[randomTrackNr-1];
  correctAlbum = albums[randomAlbumNr-1].title;
  console.log(correctSong);
}
function resetBoard()
{
  // sterg ghicirea afisata
  document.getElementById("titleText").textContent = "";
  document.getElementById("albumText").textContent = "";
  document.getElementById("trackNrText").textContent = "";
  document.getElementById("AlbumPic").removeAttribute("src");
  document.getElementById("searchInput").value = "";
  // ascund toate sagetile si bifele
  const icons = document.querySelectorAll("#AlbumDetailsBox svg");
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.display = "none";
  }
  // ascund containerul de win si sterg mesajul de stats (pt a nu se afisa de mai multe ori)
  const winContainer = document.getElementById("winContainer");
  const statsMessage = winContainer.querySelector("h2");
  if (statsMessage) {
    winContainer.removeChild(statsMessage);
  }
  winContainer.style.display = "none";
  triesNr = 0;
}
function randomNr(y)
{
    let x; // Math.random() returneaza un floating point pseudo-random din [0,1)
    x = Math.floor(Math.random() * y) + 1; // returnez partea intreaga a unui numar din [0,1) * y + 1 = [0,y) + 1 = [1, y+1) => [1,y]
    return x;
}

function play()
{
    if (!albums) {
        return; // datele inca se incarca
    }
    let albumNr;
    let trackNr;
    const guess = document.getElementById("searchInput").value.trim().toLowerCase(); // comparam fara spatii in plus si fara sa conteze literele mari/mici
    for(let albumIndex = 0; albumIndex < albums.length; albumIndex++)
    {
        let album = albums[albumIndex];
        for(let trackIndex = 0; trackIndex < album.tracks.length; trackIndex++)
        {
            if(guess === album.tracks[trackIndex].toLowerCase())
            {
                albumNr = albumIndex + 1;
                console.log(albumNr);
                trackNr = trackIndex + 1;
                console.log(trackNr);
                console.log(album.image);
                document.getElementById("titleText").textContent = album.tracks[trackIndex];
                document.getElementById("AlbumPic").src = album.image;
                document.getElementById("albumText").textContent = album.title;
                document.getElementById("trackNrText").textContent = trackNr;
                const textElements = document.getElementsByClassName('albumDetails');
                const chosenColor = pickedColor || album.color; // culoarea din picker are prioritate fata de cea a albumului
                for (let i = 0; i < textElements.length; i++) {
                    // Apply the new color to each element
                    textElements[i].style.color = chosenColor;
                  }
            }
        }
    }
    if (albumNr === undefined) { // albumNr ramane undefined daca nu se gaseste niciun cantec cu titlul respectiv
        alert("Are you sure you spelt the title correctly?");
        return; // nu are sens sa comparam mai departe
    }
    triesNr++;
    const diferentaA = randomAlbumNr - albumNr; // randomAlbumNr e de la 1 la length
    console.log(diferentaA);
    const diferentaS = randomTrackNr - trackNr; // randomTrackNr e de la 1 la length
    console.log(diferentaS);
    showHint("AlbumName", diferentaA);
    showHint("TrackNr", diferentaS);
    if (diferentaA === 0 && diferentaS === 0) {
      win();
    }
}

// arata o singura iconita langa album / numarul piesei, in functie de diferenta fata de raspuns:
// bifa = corect, sageata galbena = aproape (cel mult 2), sageata neagra = departe
// (sus = raspunsul e mai mare / album mai nou, jos = mai mic / album mai vechi)
function showHint(group, diff)
{
  const icons = ["UpArrow", "DownArrow", "GoldenUpArrow", "GoldenDownArrow", "Checkmark"];
  let visible;
  if (diff === 0) visible = "Checkmark";
  else if (diff > 2) visible = "UpArrow";
  else if (diff > 0) visible = "GoldenUpArrow";
  else if (diff >= -2) visible = "GoldenDownArrow";
  else visible = "DownArrow";

  icons.forEach(icon => {
    // id-urile din HTML sunt de forma UpArrowAlbumName, CheckmarkTrackNr etc.
    document.getElementById(icon + group).style.display = icon === visible ? "inline" : "none";
  });
}

function win() {
  const winContainer = document.getElementById("winContainer");
  const winMessage = document.getElementById("winMessage");
  const detailsMessage = document.getElementById("detailsMessage");

  winMessage.textContent = `${playerName}, you win!`;
  detailsMessage.textContent = `The correct song was "${correctSong}" from "${correctAlbum}". You got it in ${triesNr} tries!`;

  // actualizez localStorage pentru wins si best tries
  let totalWins = parseInt(localStorage.getItem("totalWins")) || 0; // default 0
  let bestTries = parseInt(localStorage.getItem("bestTries")) || Infinity; // default infinit

  // incrementez nr de totalWins
  totalWins += 1;
  localStorage.setItem("totalWins", totalWins);

  if (triesNr < bestTries) {
    bestTries = triesNr;
    localStorage.setItem("bestTries", bestTries); // salvez in local storage noul high score
  }

  // afisez containerul
  winContainer.style.display = "block";
  // afisez statisticile
  const statsMessage = document.createElement("h2");
  statsMessage.style.color = "#000000";
  statsMessage.classList.add("statsMessage");
  statsMessage.textContent = `Total Wins: ${totalWins}, Best Tries: ${bestTries}`;
  winContainer.appendChild(statsMessage); // adaug element in DOM

}

function playAgain() {
  resetBoard(); // ascunde containerul de win, sterge ghicirea anterioara si reseteaza triesNr
  console.log("Restarting the game...");
  pickRandomSong();
}
