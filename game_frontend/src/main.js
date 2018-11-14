// /**********************************************************
// * Vars and Constantants
// **********************************************************/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width
const height = canvas.height

const scoreCounter = document.getElementById('score');
let score = 100;

const moneyCounter = document.getElementById('money');
let money = 1000;

const killsCounter = document.getElementById('kills');
let kills = 0;

const roundCounter = document.getElementById('round');
let round = 0;

const creepButton = document.getElementById('add-creep-btn');

const turretButton = document.getElementById('add-turret-btn');
let turretToAdd = false;

const nextRoundButton = document.getElementById('next-round-btn');

const startButton = document.getElementById('start-btn');

let background = new Image();
background.src = 'https://imgur.com/BzYNfOl.png';

const allRounds = [];
const allTurrets = [];
const allEnemies = [];
const allDeadEnemies = [];
const allShots = [];

// Mouse Position, Used to Place Turrets
let prevX, prevY, currX, currY;
