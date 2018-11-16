/****************************************
* DOM Variables
*****************************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// let creep = new Creep(0, 375, 0.08, 750, 0); // Test Entity

const fpsDisplay = document.getElementById('fps-display');

/****************************************
* Background Setup
*****************************************/
let background = new Image();
const straightMap = 'https://imgur.com/BzYNfOl.png';
const curvyMap = 'https://i.imgur.com/WRkmpKP.png';
background.src = straightMap;


/****************************************
* Main Loop Variables
*****************************************/
let delta = 0;
let tickrate = 1000 / 60;

let lastFrameTimeMs = 0;

let fps = 60;
let fpsAlpha = 0.9;
let fpsUpdateInterval = 1000;
let lastFpsUpdate = 0;
let framesSinceLastFpsUpdate = 0;
let numUpdateSteps = 0;

let running = false;
let started = false;

let rafHandle;
/****************************************
* Main Loop Stuff
*****************************************/
function update(delta) {
  // creep.lastX = creep.x;
  // creep.x += creep.velocity * delta;
  // if(creep.x >= creep.limit || creep.x <= 0){
  //   creep.velocity = -creep.velocity;
  // }
  renderQueue.forEach((obj) => {
    obj.update(delta);
  })

  towerQueue.forEach((tower) => {
    tower.update(delta);
  })


}

function draw(interp) {
  fpsDisplay.textContent = Math.round(fps) + ' FPS'; // display the FPS
  player.draw();
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(background,0,0)

  renderQueue.forEach((obj) => {
    obj.draw(ctx, interp)
  })

  towerQueue.forEach((obj) => {
    obj.draw(ctx, interp)
  })
}

function animate(timestamp) {
  rafHandle = requestAnimationFrame(animate);

  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;

  begin(timestamp, delta);

  if (timestamp > lastFpsUpdate + fpsUpdateInterval) {
    fps = fpsAlpha * framesSinceLastFpsUpdate * 1000  / (timestamp - lastFpsUpdate) + (1 - fpsAlpha) * fps;

    lastFpsUpdate = timestamp;
    framesSinceLastFpsUpdate = 0;
  }
  framesSinceLastFpsUpdate++;

  // Update, unlinked to framerate
  numUpdateSteps = 0;
  while(delta >= tickrate) {
    update(tickrate);
    delta -= tickrate;
    // Sanity check, breaks if spiral of death starts
    if (++numUpdateSteps >= 240) { // Adds to numUpdateSteps while checking
      panic();
      break;
    }
  }

  draw(delta / tickrate);

  end(fps); // Doesn't Do Anything Yet

}

function panic() {// Sets delta to 0, Ignoring leftover time
  console.log(`PANIC:\nDelta: ${delta}`);
  delta = 0;
}

function begin(timestamp, delta) {// Currently Empty
  if(player.alive){
    if(!!currentRound){
      if(currentRound.completed()){
        player.surviveRound();

        if(currentRound.isLastRound){
          console.log("You Win!!!");
          stop();
          setTimeout(renderWinPage, 2000);
        }
      }
      if(currentRound.started && !currentRound.finished){// while currentRound still generating creeps
        currentRound.update(timestamp);
      }
    }
  } else {
    console.log("You Lose!!!");
    stop();
    setTimeout(renderLosePage, 2000);
  }

}

function end(fps) {// Currently Empty

}

function stop() {
  running = false;
  started = false;
  cancelAnimationFrame(rafHandle);
}

function start() {
  if (!started) {
    started = true;

    rafHandle = requestAnimationFrame((timestamp) => {
      draw(1); // initial draw
      running = true;
      // Resetting Time Tracking Vars
      lastFrameTimeMs = timestamp;
      lastFpsUpdate = timestamp;
      framesSinceLastFpsUpdate = 0;
      // Starting the main loop
      rafHandle = requestAnimationFrame(animate);
    });
  }
}
/****************************************
* Event Listeners
*****************************************/
canvas.addEventListener('click', (e) => {
  // debugger;
  console.log("Where Am I Clicking?");
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;
  console.log(`X: ${e.clientX} | Y: ${e.clientY}`)
  // console.log(`X: ${e.target.offsetParent.offsetLeft} | Y: ${e.target.offsetParent.offsetTop}`)
  console.log(`X: ${e.target.offsetLeft} | Y: ${e.target.offsetTop}`)
  console.log(`X: ${x} | Y: ${y}`)
})

// document.addEventListener('click', (e)=> {
//   console.log("Where Am I Clicking 2?");
//   const x = e.clientX - e.target.offsetLeft;
//   const y = e.clientY - e.target.offsetTop;
//   // const y = e.clientY - e.target.offsetTop + e.target.offsetParent.offsetTop; //can.offsetParent.offSetTop
//   console.log(`X: ${e.clientX} | Y: ${e.clientY}`)
//   console.log(`X: ${e.target.offsetLeft} | Y: ${e.target.offsetTop}`)
//   console.log(`X: ${x} | Y: ${y}`)
// })
