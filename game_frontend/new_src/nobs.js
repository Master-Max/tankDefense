startButton.addEventListener('click', () => {
  makeTmpPlayer();
  start();
  // console.log("Have I Won: 1");
})

stopButton.addEventListener('click', () => {
  stop();
})

initRoundButton.addEventListener('click', () => {
  // const data = {creepCount: 3, isLastRound: true}
  // currentRound = new Round(data);

  new Round({creepCount: 3, isLastRound: false});
  new Round({creepCount: 6, isLastRound: false});
  new Round({creepCount: 9, isLastRound: true});

  player.roundsToPlay = Round.all;

  // console.log(currentRound.length);
  console.log(player.roundsToPlay.length);
})

startRoundButton.addEventListener('click', () => {
  player.addRound()
  currentRound = player.roundsToPlay[player.currentRound - 1];
  remainingCreeps = currentRound.creeps.length;
  currentRound.start(performance.now());
})
/****************************************
* Round
*****************************************/
nextRoundButton.addEventListener('click', () => {

})

/****************************************
* Turret Placing
*****************************************/
turretButton.addEventListener('click', () => {
  turretReady = !turretReady;
  console.log(`turretReady: ${turretReady}`)
})

canvas.addEventListener('click', (e) => {
  if (turretReady) {
    console.log("Trying to Place Turret")
    turretReady = false;
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    const data = {x:x,y:y,reloadTime:1000,range:70}
    towerQueue.push(new Turret(data));
  }
})


/****************************************
* Player Making
*****************************************/
function makeTmpPlayer() {
  const data = {name: "", health:10, money:100};
  player = new Player(data);
}

/****************************************
* Reset Everything
*****************************************/
function resetEverything() {
  stop();

  towerQueue.length = 0;
  renderQueue.length = 0;
  turretReady = false;

  currentRound = null;
  remainingCreeps = 0;

  Turret.all.length = 0;
  Creep.all.length = 0;
  Round.all.length = 0;
  Shot.all.length = 0;

  ctx.clearRect(0, 0, width, height);

  // usernameInput.style.display = "none";
  // usernameInput.children.username.value = "";
  // endHighscore.style.display = "";
}
