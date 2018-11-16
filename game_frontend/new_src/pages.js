/****************************************
* DOM Variables
*****************************************/
const URL = "http://localhost:3000/api/v1"

const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-page');
const endPage = document.getElementById('end-page');
const winPage = document.getElementById('win-page');
const losePage = document.getElementById('lose-page');

let newUserGame = true;

// Start Page
const gameStartButton = document.getElementById('game-start-btn');

// Win Page
const endForm = document.getElementById('end-form');
const endSelect = document.getElementById('end-select');
const finalScore = document.getElementById('final-score');
const dontSaveButton = document.getElementById('dontsave-btn');
let finalGameScore = 0;

// Lose Page
const restartButton = document.getElementById('restart-btn');
const usernameInput = document.getElementById('username-input');
const endHighscore = document.getElementById('end-highscore');
const highscoreSpan = document.getElementById('highscore-span');

/****************************************
* Render Page Functions
*****************************************/
function renderStartPage(){
  startPage.style.display = "block"
  gamePage.style.display = "none"
  endPage.style.display = "none"
  winPage.style.display = "none"
  losePage.style.display = "none"
}

function renderGamePage(){
  startPage.style.display = "none"
  gamePage.style.display = "block"
  endPage.style.display = "none"
  winPage.style.display = "none"
  losePage.style.display = "none"
}

function renderWinPage(){
  startPage.style.display = "none"
  gamePage.style.display = "none"
  endPage.style.display = "block"
  winPage.style.display = "block"
  losePage.style.display = "none"

  endForm.style.display = "";
  endHighscore.style.display = "none";
  // I DONT LIKE THERE HERE?
  fetchAllUsers();
  // addUsersToEndSelect();
  updateFinalScore();
}

function renderLosePage(){
  startPage.style.display = "none"
  gamePage.style.display = "none"
  endPage.style.display = "block"
  winPage.style.display = "none"
  losePage.style.display = "block"
}

/****************************************
* Helper Functions
*****************************************/
function fetchAllUsers(){
  User.all.length = 0; // <-- Kinda Hackey :( DONT LIKE
  console.log("Fetching Users");
  fetch(URL+"/users")
  .then(responseObject => responseObject.json())
  .then(json => {
    // debugger;
    json.forEach(user => {
      const newUser = new User(user);
    });
    console.dir(User.all)
    addUsersToEndSelect();
    // test1.innerHTML = User.all.length;
  })
}

function addUsersToEndSelect(){
  let newOptions = '<option value="0">New User</option>'
  User.all.forEach(user => {
    newOptions +=
    `
      <option value="${user.id}">${user.name}</option>
    `
  })
  endSelect.innerHTML = newOptions;
}

function updateFinalScore(){
  finalGameScore = player.health * player.kills;
  finalScore.innerHTML = finalGameScore;
}

function createNewUser(name, highscore){
  const newUser = new User({name: name, highscore: highscore})
  fetch(URL+"/users", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
  })
  .then(responseObject => responseObject.json())
  .then(json => {
    console.log(json);
    createNewGame(json.id, json.highscore);
  })
}

function createNewGame(userId, score){
  const newGame = {user_id: userId, score: score}
  fetch(URL+"/games", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newGame)
  })
  .then(responseObject => responseObject.json())
  .then(json => {
    console.log(json);
  })
}

/****************************************
* Event Listeners
*****************************************/
document.addEventListener('DOMContentLoaded', () => {
  renderStartPage();
})

gameStartButton.addEventListener('click', () => {
  renderGamePage();
})

endSelect.onchange = (event) => {
   // console.log("End Select Changed")
   // console.log(`EVal: ${event.target.value}`)
   if (event.target.value > 0) {
     // console.log("Trying to hide stuff")
     // usernameInput.style.visiblity = "hidden";
     usernameInput.style.display = "none";
     endHighscore.style.display = "";
     // debugger;
     highscoreSpan.innerHTML = User.findById(Number(event.target.value)).highscore;
     newUserGame = false;
   } else {
     // console.log("Trying to show stuff")
     // usernameInput.style.visiblity = "visible";
     endHighscore.style.display = "none";
     usernameInput.style.display = "";
     newUserGame = true;
   }
 }

endForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // debugger
  if (endSelect.value > 0) {
    createNewGame(endSelect.value, finalGameScore);
  } else {
    createNewUser(e.target.username.value, finalGameScore);
  }// TODO: Make sure to re-render endForm on load after play-again
  endForm.style.display = 'none';
})

dontSaveButton.addEventListener('click', () => {
  endForm.style.display = "none";
})

restartButton.addEventListener('click', () => {
  resetEverything();
  renderStartPage();
})
