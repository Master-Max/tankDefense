class Turret {
  constructor(data){
    this.x = data.x;
    this.y = data.y;
    this.reloadTime = data.reloadTime;
    this.range = data.range;
    this.rangeSquared = this.range**2;
    // Fire Booleans
    this.primed = true;
    this.reloadTimeLeft;

    // Cosmetics
    this.color = "green";
    this.size = 20;
    this.halfSize = this.size / 2;

    Turret.all.push(this);
  }

  inRange(x, y) {
    let d = (this.x - x)**2 + (y-this.y)**2
    if (d <= this.rangeSquared) {
      return true;
    } else {
      return false;
    }
  }

  fire(creep){
    this.primed = false;
    this.reloadTimeLeft = this.reloadTime;
    const data = {x1:this.x, y1:this.y, x2:creep.x, y2:creep.y}
    renderQueue.push(new Shot(data)); // I guess they go in here
    removeFromRenderQueue(creep);
    player.addKill();
  }

  reload(delta){
    if (this.reloadTimeLeft <= 0){
      this.primed = true
    } else {
      this.reloadTimeLeft -= delta;
    }
  }

  update(delta){
    if(this.primed) {
      renderQueue.forEach((creep) => {
        if(this.inRange(creep.x, creep.y)){
          this.fire(creep);
        }
      })
    } else {
      this.reload(delta);
    }
  }

  draw(ctx, interp){
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.fillRect(this.x-this.halfSize, this.y-this.halfSize, this.size, this.size);
    // ctx.strokeRect(this.x-this.range, this.y-this.range, this.range*2, this.range*2);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, 2*Math.PI);
    ctx.stroke();
  }
}

Turret.all = [];
