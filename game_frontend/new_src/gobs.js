/****************************************
* Draw Array
*****************************************/
const renderQueue = [];
function removeFromRenderQueue(obj){
  const index = renderQueue.indexOf(obj);
  renderQueue.splice(index, 1);
}

const towerQueue = [];

const tmpQueue = [];

/****************************************
* New Dev Buttons
*****************************************/
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const initRoundButton = document.getElementById('init-round-btn');
const startRoundButton = document.getElementById('start-round-btn');

/****************************************
* Round Buttons
*****************************************/
const nextRoundButton = document.getElementById('next-round-btn');
/****************************************
* Turret Placer
*****************************************/
const turretButton = document.getElementById('add-turret-btn');
let turretReady = false;

/****************************************
* Player Stuff
*****************************************/
const healthDisplay = document.getElementById('health');
const moneyDisplay = document.getElementById('money');
const killsDisplay = document.getElementById('kills');
const roundDisplay = document.getElementById('round');
const remainingDisplay = document.getElementById('remaining');
let remainingCreeps;
let player;


// Round Tracker
let currentRound;
