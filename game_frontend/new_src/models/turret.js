class Turret {
  constructor(data){
    this.x = data.x;
    this.y = data.y;
    this.reloadTime = data.reloadTime;
    this.range = data.range;
    this.rangeSquared = this.range**2;
    /* Fire Booleans */
    this.primed = true;
    this.reloadTimeLeft;

    /* Cosmetics */
    this.color = "green";
    this.size = 20;
    this.halfSize = this.size / 2;

    /* Sprite */
    this.sprite = new Image(64,64);
    this.sprite.src = bigAtgSprite;
    // this.sprite = new Image(32,32);
    // this.sprite.src = atgSprite;

    /* Rotation */
    this.rad = 0.0;

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
    this.rad = Math.atan2(creep.x-this.x, this.y-creep.y);
    // console.log(`Rad: ${this.rad}`)

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
          if (this.primed){
            this.fire(creep);
          }
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

  drawSprite(ctx, interp){
    ctx.drawImage(this.sprite, this.x-(this.sprite.height/2), this.y-(this.sprite.width/2))

    // ctx.strokeStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.range, 0, 2*Math.PI);
    // ctx.stroke();
  }

  drawRotated(ctx, interp){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rad);
    ctx.drawImage(this.sprite, -(this.sprite.height/2), -(this.sprite.width/2));
    ctx.restore();
    // ctx.drawImage(this.sprite, this.x-(this.sprite.height/2), this.y-(this.sprite.width/2))
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, 2*Math.PI);
    ctx.stroke();
  }

}

Turret.all = [];
