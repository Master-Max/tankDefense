class Round{
  constructor(data){
    this.creepCount = data.creepCount;
    this.isLastRound = data.isLastRound;
    this.minRate = 500;
    this.started = false;
    this.finished = false;
    this.startTime;
    this.lastRender;
    this.creeps = [];
    this.genCreeps();
  }

  genCreeps(){
    while(this.creeps.length < this.creepCount){
      const data = {x:0, y:375, v:0.08, h:1, l:750, p:0}
      const creep = new Creep(data);
      this.creeps.push(creep);
    }
  }

  start(t){
    this.startTime = t;
    this.lastRender = this.startTime;
    this.started = true;
  }

  completed(){
    if(this.finished && this.started && renderQueue.length === 0){
      return true;
    } else {
      return false;
    }
  }

  update(timestamp){
    // Looks at time that has passed
    // if time is greater than min
    // pop creep into render array
    if (!this.finished){
      // console.log(`min: ${this.minRate}\ndif: ${timestamp - this.lastRender}\nts: ${timestamp}\nlr: ${this.lastRender}`)
      if ( this.minRate < timestamp - this.lastRender) {
        renderQueue.push(this.creeps.shift());
        this.lastRender = timestamp;
      }
      if (this.creeps.length === 0) {
        this.finished = true;// Finished Generating Round is still going
      }
    }
    // NEED TO ADD variance, make them wait more between spawns

  }
}
