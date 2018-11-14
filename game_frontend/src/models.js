class Round {
  constructor(creepCount, min, max){
    this.creepCount = creepCount;
    this.min = min;
    this.max = max;
    this.genCount = 0;
  }

  genWaitTime(){
    return Math.random() * (this.max - this.min) + this.min;
    // return getRandomArbitrary(this.min, this.max);
  }

  genCreeps(){
    const t = this.genWaitTime()
    if(this.genCount < this.creepCount){
      this.genCount += 1;
      setTimeout(() => {
        addEnemy();
        this.genCreeps();
      }, t)
    }
  }
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

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }

function addEnemy(){
  let creep = new Enemy(1, 0, width/2, 2);
  allEnemies.push(creep);
}

function addShot(turret, creep){
  let shot = new Shot(turret.xPos, turret.yPos, creep.xPos, creep.yPos, "#ADD8E6", turret.fireRate / 2);
  allShots.push(shot);
}

function addTurret(x,y){
  money -= 100;
  let turret = new Turret(x, y, 700, 70);
  console.log(`New Turret:\nx: ${turret.xPos}\ny: ${turret.yPos}`)
  allTurrets.push(turret)
}

function setRounds(){

}
