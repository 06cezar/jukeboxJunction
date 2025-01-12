var allTracks = []; // array cu toate piesele pt search filter
var albums; // va lua valoarea unui array de obiecte
var randomAlbumNr;
var randomTrackNr;
var triesNr = 0;
var songsGuessed = 0;
var correctSong;
var correctAlbum;
window.onload = function() {
  const savedArtist = localStorage.getItem("selectedArtist") || "tyler";
  fetch(`resources/json/${savedArtist}.json`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("searchInput").placeholder = "Type a song...";
        albums = data.discography; // datele din json (obiecte)
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
        randomAlbumNr = randomNr(albums.length); // nr random pt album (de la 1 la album nr ul ultimului album)
        console.log(randomAlbumNr);
        randomTrackNr = randomNr(albums[randomAlbumNr-1].tracks.length); // indicii array-ului sunt de la 0 - n-1
        console.log(randomTrackNr);
        console.log(albums[randomAlbumNr-1].tracks[randomTrackNr-1]);
        console.log(albums);
        document.getElementById('output').innerHTML = html;
        correctSong = albums[randomAlbumNr-1].tracks[randomTrackNr-1];
        correctAlbum = albums[randomAlbumNr-1].title;
      })
      .catch(err => {
        console.error(err);
        document.getElementById('output').innerText = 'Failed to load data.';
      });
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

// ascunde dropdown-ul daca se apasa in afara
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) { // target 
    dropdown.style.display = 'none';
  }
});
const artistCards = document.querySelectorAll(".artist-card");

artistCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedArtist = card.id; 
    localStorage.setItem("selectedArtist", selectedArtist); 
    console.log(`Selected artist saved: ${selectedArtist}`);
  });
});
}
function randomNr(y)
{   
    let x; // Math.random() returneaza un floating point pseudo-random din [0,1)
    x = Math.floor(Math.random() * y) + 1; // returnez partea intreaga a unui numar din [0,1) * y + 1 = [0,y) + 1 = [1, y+1) => [1,y]
    return x;
}

function play()
{
const colorPicker = document.getElementById('colorPicker');
const textElements = document.getElementsByClassName('albumDetails');

colorPicker.addEventListener('input', function() {

  const chosenColor = colorPicker.value; 
  for (let i = 0; i < textElements.length; i++) {
    // aplic culoarea
    textElements[i].style.color = chosenColor;
  }
});

    let albumNr;
    let trackNr;
    let UpArrowAlbumName = document.getElementById("UpArrowAlbumName");
    let DownArrowAlbumName = document.getElementById("DownArrowAlbumName");
    let GoldenUpArrowAlbumName = document.getElementById("GoldenUpArrowAlbumName");
    let GoldenDownArrowAlbumName = document.getElementById("GoldenDownArrowAlbumName");
    let CheckmarkAlbumName = document.getElementById("CheckmarkAlbumName");
    let UpArrowTrackNr = document.getElementById("UpArrowTrackNr");
    let DownArrowTrackNr = document.getElementById("DownArrowTrackNr");
    let GoldenUpArrowTrackNr = document.getElementById("GoldenUpArrowTrackNr");
    let GoldenDownArrowTrackNr= document.getElementById("GoldenDownArrowTrackNr");
    let CheckmarkTrackNr = document.getElementById("CheckmarkTrackNr");
    let guess = document.getElementById("searchInput").value;
    guess = String(guess);
    let diferentaA;
	let diferentaS;
    for(let albumIndex = 0; albumIndex < albums.length; albumIndex++)
    {
        let album = albums[albumIndex];
        for(let trackIndex = 0; trackIndex < album.tracks.length; trackIndex++)
        {
            if(guess === album.tracks[trackIndex])
            {
                albumNr = albumIndex + 1;
                console.log(albumNr);
                trackNr = trackIndex + 1;
                console.log(trackNr);
                console.log(album.image);
                document.getElementById("titleH1").innerHTML = guess;
			    document.getElementById("AlbumPic").src = album.image;
			    document.getElementById("albumH1").innerHTML = album.title;
			    document.getElementById("trackNrH1").innerHTML = trackNr;
                const textElements = document.getElementsByClassName('albumDetails');
                const chosenColor = album.color;
                for (let i = 0; i < textElements.length; i++) {
                    // Apply the new color to each element
                    textElements[i].style.color = chosenColor;
                  }
            }
        }
    }
    if (isNaN(albumNr)) { // fiind definita ca let, va avea valoarea NaN daca nu se gaseste niciun cantec cu titlul respectiv
        alert("Are you sure you spelt the title correctly?")
    }
    else{
        triesNr++;
    }
    diferentaA = randomAlbumNr - albumNr; // randomAlbumNr e de la 1 la length
    console.log(diferentaA);
	diferentaS = randomTrackNr - trackNr; // randomTrackNr e de la 1 la length
	console.log(diferentaS);
    if(diferentaA<=2 && diferentaA>0){
        UpArrowAlbumName.style.display = "none";
        DownArrowAlbumName.style.display = "none";
        GoldenUpArrowAlbumName.style.display = "inline";
        GoldenDownArrowAlbumName.style.display = "none";
        CheckmarkAlbumName.style.display = "none";
    }
    else if(diferentaA>2){
      UpArrowAlbumName.style.display = "inline";
      DownArrowAlbumName.style.display = "none";
      GoldenUpArrowAlbumName.style.display = "none";
      GoldenDownArrowAlbumName.style.display = "none";
      CheckmarkAlbumName.style.display = "none";
    }
    else if(diferentaA>=-2 && diferentaA<0){
      UpArrowAlbumName.style.display = "none";
      DownArrowAlbumName.style.display = "none";
      GoldenUpArrowAlbumName.style.display = "none";
      GoldenDownArrowAlbumName.style.display = "inline";
      CheckmarkAlbumName.style.display = "none";
    }
    else if(diferentaA<-2){
      UpArrowAlbumName.style.display = "none";
      DownArrowAlbumName.style.display = "inline";
      GoldenUpArrowAlbumName.style.display = "none";
      GoldenDownArrowAlbumName.style.display = "none";
      CheckmarkAlbumName.style.display = "none";
    }
    else if(diferentaA==0){
      UpArrowAlbumName.style.display = "none";
      DownArrowAlbumName.style.display = "none";
      GoldenUpArrowAlbumName.style.display = "none";
      GoldenDownArrowAlbumName.style.display = "none";
      CheckmarkAlbumName.style.display = "inline";
    }
    if(diferentaS<=2 && diferentaS>0){
      UpArrowTrackNr.style.display = "none";
      DownArrowTrackNr.style.display = "none";
      GoldenUpArrowTrackNr.style.display = "inline";
      GoldenDownArrowTrackNr.style.display = "none";
      CheckmarkTrackNr.style.display = "none";
    }
    else if(diferentaS>2){
      UpArrowTrackNr.style.display = "inline";
      DownArrowTrackNr.style.display = "none";
      GoldenUpArrowTrackNr.style.display = "none";
      GoldenDownArrowTrackNr.style.display = "none";
      CheckmarkTrackNr.style.display = "none";
    }
    else if(diferentaS>=-2 && diferentaS<0){
      UpArrowTrackNr.style.display = "none";
      DownArrowTrackNr.style.display = "none";
      GoldenUpArrowTrackNr.style.display = "none";
      GoldenDownArrowTrackNr.style.display = "inline";
      CheckmarkTrackNr.style.display = "none";
    }
    else if(diferentaS<-2) {
      UpArrowTrackNr.style.display = "none";
      DownArrowTrackNr.style.display = "inline";
      GoldenUpArrowTrackNr.style.display = "none";
      GoldenDownArrowTrackNr.style.display = "none";
      CheckmarkTrackNr.style.display = "none";
    }
    else if(diferentaS==0){
      UpArrowTrackNr.style.display = "none";
      DownArrowTrackNr.style.display = "none";
      GoldenUpArrowTrackNr.style.display = "none";
      GoldenDownArrowTrackNr.style.display = "none";
      CheckmarkTrackNr.style.display = "inline";
    }
    if(diferentaA==0 && diferentaS==0){
      // iconitele au fost puse deja corect de la if-urile de mai sus 
      win();
    }
}
let playerName = localStorage.getItem("loggedInUser") || "Player";


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
  
  const winContainer = document.getElementById("winContainer");
  const statsMessage = winContainer.querySelector("h2");

  // sterg mesajul de stats din DOM (pt a nu se afisa de mai multe ori daca jucam iarasi)
  if (statsMessage) {
    winContainer.removeChild(statsMessage);
  }

  //ascund containerul
  winContainer.style.display = "none";

  console.log("Restarting the game...");
  randomAlbumNr = randomNr(albums.length); // nr random pt album (de la 1 la album nr ul ultimului album)
  console.log(randomAlbumNr);
  randomTrackNr = randomNr(albums[randomAlbumNr-1].tracks.length); // indicii array-ului sunt de la 0 - n-1
  console.log(randomTrackNr);
  triesNr = 0;
  correctSong = albums[randomAlbumNr-1].tracks[randomTrackNr-1];
  correctAlbum = albums[randomAlbumNr-1].title;
  console.log(correctSong);
}
