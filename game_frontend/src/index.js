const testPage = document.getElementById('test-page');
const test1 = document.getElementById('test1');


const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-page');
const endPage = document.getElementById('end-page');
const winPage = document.getElementById('win-page');
const losePage = document.getElementById('lose-page');
const URL = "http://localhost:3000/api/v1"

const endForm = document.getElementById('end-form');
const endSelect = document.getElementById('end-select');
const usernameInput = document.getElementById('username-input');

let newUserGame = true;

const finalScore = document.getElementById('final-score');
let finalGameScore = 0;

const restartButton = document.getElementById('restart-btn');

document.addEventListener('DOMContentLoaded', () => {
  console.dir(startPage, gamePage, endPage, winPage, losePage)
  // debugger;
  renderStartPage();
  //MOVE THIS LATER
  // fetchAllUsers(); // Should be called IF player get to Win Screen
})

startButton.addEventListener('click', (event) => {
  startTheGame()
})

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

endSelect.onchange = (event) => {
   console.log("End Select Changed")
   console.log(`EVal: ${event.target.value}`)
   if (event.target.value > 0) {
     console.log("Trying to hide stuff")
     // usernameInput.style.visiblity = "hidden";
     usernameInput.style.display = "none";
     newUserGame = false;
   } else {
     console.log("Trying to show stuff")
     usernameInput.style.display = "";
     newUserGame = true;
   }
   // debugger;
 }

function updateFinalScore(){
  finalGameScore = (health + kills) * 100
  finalScore.innerHTML = `${finalGameScore}`
}

function fetchAllUsers(){
  console.log("Fetching Users");
  fetch(URL+"/users")
  .then(responseObject => responseObject.json())
  .then(json => {
    // debugger;
    json.forEach(user => {
      const newUser = new User(user);
    });
    console.dir(User.all)
    // test1.innerHTML = User.all.length;
  })
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

function renderStartPage(){
  startPage.style.display = "block"
  gamePage.style.display = "none"
  endPage.style.display = "none"
  winPage.style.display = "none"
  losePage.style.display = "none"
}

function startTheGame(){
  startPage.style.display = "none"
  gamePage.style.display = "block"
  endPage.style.display = "none"
  winPage.style.display = "none"
  losePage.style.display = "none"
  startGame();
}

function winTheGame(){
  gamePage.style.display = "none"
  endPage.style.display = "block"
  winPage.style.display = "block"
  losePage.style.display = "none"

  endForm.style.display = "";

  fetchAllUsers();
  addUsersToEndSelect();
  updateFinalScore();
}

function loseTheGame(){
  gamePage.style.display = "none"
  endPage.style.display = "block"
  winPage.style.display = "none"
  losePage.style.display = "block"
}

function stopEverything(){
  console.log("AHHHHHH CODE ME LATER!!!");
}
