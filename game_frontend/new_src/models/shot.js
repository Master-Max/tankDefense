class Shot {
  constructor(data){
    this.x1 = data.x1;
    this.y1 = data.y1;
    this.x2 = data.x2;
    this.y2 = data.y2;

    // this.creep = data.creep

    this.color = "#ADD8E6";
    this.timeTillFade = 140;

    Shot.all.push(this);
  }

  update(delta){
    if(this.timeTillFade <= 0){
      removeFromRenderQueue(this);
    } else {
      this.timeTillFade -= delta;
    }
  }

  draw(ctx, interp){ // Not Generalized Yet
    ctx.fillStyle = "grey";
    ctx.fillRect(this.x2 - 5, this.y2 - 5, 10, 10)
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
  }
}

Shot.all = [];
