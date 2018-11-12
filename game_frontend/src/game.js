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

const creepButton = document.getElementById('add-creep-btn');
const turretButton = document.getElementById('add-turret-btn');
let turretToAdd = false;


let prevX, prevY, currX, currY;
/**********************************************************
* Making Entities
**********************************************************/
const allEnemies = [];
const allTurrets = [];


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

function addTurret(x,y){
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


/**********************************************************
* Helpers
**********************************************************/
function findxy(e) {
  prevX = currX;
  prevY = currY;
  currX = e.clientX - canvas.offsetLeft;
  currY = e.clientY - canvas.offsetTop;
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

  ctx.clearRect(0, 0, width, height) //Clear Whole canvas

  allEnemies.forEach((creep) => {//Make This A Method
    if (creep.health <= 0){
      removeEnemy(creep);
    }
    ctx.fillStyle = creep.color;
    ctx.fillRect(creep.xPos - 5, creep.yPos - 5, 10, 10)
  })

  allTurrets.forEach((turret) => {
    ctx.fillStyle = turret.color;
    ctx.fillRect(turret.xPos - 10, turret.yPos - 10, 20, 20)
    ctx.strokeRect(turret.xPos - turret.range, turret.yPos - turret.range, (turret.range * 2), (turret.range * 2))
  })
}

function loop(timestamp) {
  let progress = timestamp - lastRender;
  // console.log(progress)
  update(5)
  draw()

  lastRender = timestamp;

  window.requestAnimationFrame(loop)
}

let lastRender = 0;
window.requestAnimationFrame(loop)
