
function startGame(){
  alert("startGame() Was Run!!!")
  running = true;
  window.requestAnimationFrame(loop)
  round = 0;
  console.log(`Rounds: ${round}`)
  let r1 = new Round(10, 10, 1000);
  // let r2 = new Round(50, 5, 750);
  // let r3 = new Round(100, 1, 500);
  console.log("Rounds Generated");
  allRounds.length = 0;
  // allRounds.push(r1,r2,r3);
  allRounds.push(r1);
  console.log(`Rounds Count: ${allRounds.length}`)
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
  // debugger;
  console.log(`Starting Round ${round + 1}`);
  console.log(allRounds[allRounds.length - 1]);
  if (allRounds[round] === allRounds[allRounds.length - 1]){
    lastRound = true;
  }
  if (!roundIsRunning){
    roundIsRunning = true;
    debugger
    allRounds[round].genCreeps();
    currentRound = round;
    round += 1;
  }
})

startButton.addEventListener('click', (event) => {
  startGame();
})

pauseButton.addEventListener('click', () => {
  if (!running){
    running = true;
    window.requestAnimationFrame(loop)
  } else {
    running = false;
  }


})

restartButton.addEventListener('click', () => {
  running = false;
  // startTheGame();

  health = 100;
  health = 1;
  money = 1000;
  kills = 0;
  round = 0;
  currentRound = 0;
  lastRound = false;
  roundIsRunning = false;
  turretToAdd = false;
  finalGameScore = 0;

  allRounds.length = 0;
  allTurrets.length = 0;
  allEnemies.length = 0;
  allDeadEnemies.length = 0;
  allShots.length = 0;

  startTheGame();
})

/**********************************************************
* Helpers
**********************************************************/
function findxy(e) {
  // debugger;
  prevX = currX;
  prevY = currY;
  console.log(`Finding XY:\nevent(x,y): (${e.clientX},${e.clientY})`);
  console.log(`canvas(x,y): (${canvas.offsetLeft},${canvas.offsetTop})`);
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
    if (creep.health <= 0){
      kills += 1;
      // allDeadEnemies.push({creep: creep, show: 7});
      removeEnemy(creep);
    } else {
      creep.xPos += creep.speed

      if (creep.xPos > width) {
        health -= 1;
        const index = allEnemies.indexOf(creep);
        allEnemies.splice(index, 1);
      }
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

function roundUpdate(){
  if (allRounds[currentRound].completed){
    roundIsRunning = false;
    console.log(`Finished Round: ${round}`);
    if (lastRound){
      console.log("WAIT YOU WON?");
      winTheGame();
    }
  }
  if (health <= 0){
    console.log("YOU LOST DUMBASS");
    stopEverything();
    loseTheGame();
  }
}

function update(progress){
  if (roundIsRunning){
    roundUpdate();
  }
  turretUpdate();
  enemyUpdate();
}

function draw() {
  healthCounter.innerHTML = health;
  moneyCounter.innerHTML = money;
  killsCounter.innerHTML = kills;
  roundCounter.innerHTML = round;

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
    // console.log(`New Turret:\nx: ${turret.xPos}\ny: ${turret.yPos}`)

    ctx.strokeRect(turret.xPos - turret.range, turret.yPos - turret.range, (turret.range * 2), (turret.range * 2))
  })
}
// Put in a clear all game objects thing
function loop(timestamp) { // Put in a boolean to pause this
  if (running){
    let progress = timestamp - lastRender;
    update(progress)
    draw()
    lastRender = timestamp;
    window.requestAnimationFrame(loop)
  }
}

let lastRender = 0;
// window.requestAnimationFrame(loop)// Maybe dont start this till the div loads? Have in function?
