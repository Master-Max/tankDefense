const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width
const height = canvas.height

const scoreCounter = document.getElementById('score');
let score = 100;

const moneyCounter = document.getElementById('money');
let money = 1000;

const creepButton = document.getElementById('add-creep-btn');

const turretButton = document.getElementById('add-turret-btn');
let turretToAdd = false;

const nextRoundButton = document.getElementById('next-round-btn');

let background = new Image();
background.src = 'https://imgur.com/BzYNfOl.png';

const allRounds = [];
const allTurrets = [];
const allEnemies = [];
const allDeadEnemies = [];
const allShots = [];
