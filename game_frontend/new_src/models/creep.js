class Creep{
  constructor(data){
    this.x = data.x;
    this.y = data.y;
    this.velocity = data.v;
    this.health = data.h;
    this.limit = data.l;
    this.lastX = data.p;

    // Cosmetics
    this.color = "red";
    this.size = 10;
    this.halfSize = this.size / 2;

    Creep.all.push(this);
  }

  update(delta){
    this.lastX = this.x;
    this.x += this.velocity * delta;
    // if(this.x >= this.limit || this.x <= 0){
    //   this.velocity = -this.velocity;
    // }
    if(this.x >= this.limit){// Creep reaches end of Map
      console.log("Creep Hit");
      player.hitFace(1);
      removeFromRenderQueue(this);
    }
  }

  draw(ctx, interp){
    ctx.fillStyle = this.color;
    ctx.fillRect((this.lastX + (this.x - this.lastX) * interp) - this.halfSize, this.y - this.halfSize, this.size, this.size)
  }

}

Creep.all = [];
