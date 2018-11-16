class Shot {
  constructor(data){
    this.x1 = data.x1;
    this.y1 = data.y1;
    this.x2 = data.x2;
    this.y2 = data.y2;

    // this.creep = data.creep

    // this.color = "#ADD8E6"; // Light Blue
    this.color = '#FFA500'; // Orange
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
    ctx.fillStyle = "black";
    ctx.fillRect(this.x2 - 10, this.y2 - 5, 20, 10)
    ctx.strokeStyle = this.color;
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();
  }
}

Shot.all = [];
