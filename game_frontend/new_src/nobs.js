startButton.addEventListener('click', () => {
  makeTmpPlayer();
  start();
})

stopButton.addEventListener('click', () => {
  stop();
})

initRoundButton.addEventListener('click', () => {
  const data = {creepCount: 3, isLastRound: true}
  currentRound = new Round(data);
  console.log(currentRound.length);
  // currentRound.genCreeps();
})

startRoundButton.addEventListener('click', () => {
  player.addRound()
  remainingCreeps = currentRound.creeps.length;
  currentRound.start(performance.now());
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
