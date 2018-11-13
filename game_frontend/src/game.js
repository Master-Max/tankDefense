/**********************************************************
* Vars and Constantants
**********************************************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ctx.fillStyle = "red";

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
// const bg1URL = 'https://imgur.com/BzYNfOl';
background.src = 'https://imgur.com/BzYNfOl.png'; // Why no local load?

console.dir(background)

let prevX, prevY, currX, currY;
/**********************************************************
* Making Entities
**********************************************************/
const allEnemies = [];
const allTurrets = [];
const allShots = [];
const allRounds = [];
const allDeadEnemies = [];

class Round {
  constructor(){

  }
}



function addEnemy(){
  let creep = new Enemy(1, 0, width/2, 2);
  allEnemies.push(creep);
}

class Enemy {
  constructor(health, xPos, yPos, speed){
    this.health = health;
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
    this.color = "red";
  }
}

function addShot(turret, creep){
  let shot = new Shot(turret.xPos, turret.yPos, creep.xPos, creep.yPos, "#ADD8E6", turret.fireRate / 2);
  allShots.push(shot);
}

class Shot {
  constructor(startX, startY, endX, endY, color, fadeRate){
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.fadeRate = fadeRate;
  }
}


function addTurret(x,y){
  money -= 100;
  let turret = new Turret(x, y, 700, 70);
  allTurrets.push(turret)
}

class Turret {
  constructor(xPos, yPos, fireRate, range){
    this.xPos = xPos;
    this.yPos = yPos;
    this.fireRate = fireRate;
    this.range = range;
    this.primed = true;
    this.reloading = false;
    this.color = "green";
  }

  reload(){
    console.log("Starting Reload");
    this.reloading = true;
    this.color = "red";
    setTimeout(() => {
      console.log("reloaded");
      this.primed = true;
      this.color = "green";
      this.reloading = false;
    }, this.fireRate);
  }

  fire(creep){
    if (creep.xPos > (this.xPos - this.range) && creep.xPos < (this.xPos + this.range)){
      if (creep.yPos > (this.yPos - this.range) && creep.yPos < (this.yPos + this.range)){
        if (this.primed){
          console.log("Bang");
          creep.health -= 1;
          creep.color = "blue";
          addShot(this, creep);
          this.primed = false;
          if (!this.reloading){
            this.reload();
          }
        } else {
          console.log("Still Reloading");
        }
      }
    }
  }
}

/**********************************************************
* Event Listeners
**********************************************************/
creepButton.addEventListener('click', (event) => {
  addEnemy();
})

turretButton.addEventListener('click', () => {
  turretToAdd = true;
  if (turretToAdd){
    console.dir(turretToAdd);
  }
})

canvas.addEventListener('click', (event) => {
  if (turretToAdd){
    // debugger;
    findxy(event);
    addTurret(currX, currY);
    turretToAdd = false;
  }
})

nextRoundButton.addEventListener('click', (event) => {

})


/**********************************************************
* Helpers
**********************************************************/
function findxy(e) {
  prevX = currX;
  prevY = currY;
  currX = e.clientX - canvas.offsetLeft;
  currY = e.clientY - canvas.offsetTop;
}

function removeShot(shot){
  const index = allShots.indexOf(shot);
  allShots.splice(index, 1);
}

function removeEnemy(creep){
  const index = allEnemies.indexOf(creep);
  allEnemies.splice(index, 1);
}
/**********************************************************
* Game Loop
**********************************************************/
function enemyUpdate(){
  allEnemies.forEach((creep) => {
    creep.xPos += creep.speed

    if (creep.xPos > width) {
      score -= 1;
      const index = allEnemies.indexOf(creep);
      allEnemies.splice(index, 1);
    }
  });
}

function turretUpdate(){
  allTurrets.forEach((turret) => {
    allEnemies.forEach((creep) => {
      turret.fire(creep);
    })
  })
}

function update(progress){
  enemyUpdate()
  turretUpdate()
}

function draw() {
  scoreCounter.innerHTML = score;
  moneyCounter.innerHTML = money;

  ctx.clearRect(0, 0, width, height) //Clear Whole canvas

  ctx.drawImage(background,0,0); //Background Image

  ctx.lineWidth=5;

  allShots.forEach((shot) => {
    ctx.fillStyle = "grey";
    ctx.fillRect(shot.endX - 5, shot.endY - 5, 10, 10);
    ctx.strokeStyle = shot.color;
    ctx.beginPath();
    ctx.moveTo(shot.startX, shot.startY);
    ctx.lineTo(shot.endX, shot.endY);
    ctx.stroke();
    //Show The Shot for a few extra frames.
    setTimeout(() => {removeShot(shot)}, shot.fadeRate);
    // removeShot(shot);
  })

  ctx.lineWidth=1;

  allEnemies.forEach((creep) => {//Make This A Method
    if (creep.health <= 0){
      allDeadEnemies.push({creep: creep, show: 7});
      removeEnemy(creep);
      // console.log("Deads: ");
      // console.log(allDeadEnemies.length);
      // console.log("=====")
      // setTimeout(() => {
      //   removeEnemy(creep);
      // }, 100)
    } else {
      ctx.fillStyle = creep.color;
      ctx.fillRect(creep.xPos - 5, creep.yPos - 5, 10, 10)
    }
  })

  // allDeadEnemies.forEach((ded) => {
  //   if (ded.show > 0){
  //     ctx.fillStyle = "grey";
  //     ctx.fillRect(ded.creep.xPos - 5, ded.creep.yPos - 5, 10, 10)
  //     ded.show -= 1
  //   }
  // })

  allTurrets.forEach((turret) => {
    ctx.fillStyle = turret.color;
    ctx.strokeStyle = turret.color;
    // ctx.fillStyle = "white";
    ctx.fillRect(turret.xPos - 10, turret.yPos - 10, 20, 20)

    ctx.strokeRect(turret.xPos - turret.range, turret.yPos - turret.range, (turret.range * 2), (turret.range * 2))
  })
}

function loop(timestamp) {
  let progress = timestamp - lastRender;
  // console.log(progress)
  update(progress)
  draw()

  lastRender = timestamp;

  window.requestAnimationFrame(loop)
}

let lastRender = 0;
window.requestAnimationFrame(loop)
