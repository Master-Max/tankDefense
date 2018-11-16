class Player {
  constructor(data){
    this.name = data.name;
    this.health = data.health;
    this.money = data.money;

    this.alive = true;

    this.roundsSurvived = 0;
    this.kills = 0;
    this.currentRound = 0;
  }

  hitFace(power){
    this.health -= power;
    if(this.health <= 0){
      this.alive = false;
    }
  }

  surviveRound(){
    this.roundsSurvived++;
  }

  addRound(){
    this.currentRound++;
  }

  addKill(){
    this.kills++;
    remainingCreeps--;
  }

  update(){

  }

  draw(){
    healthDisplay.textContent = this.health;
    moneyDisplay.textContent = this.money;
    killsDisplay.textContent = this.kills;
    roundDisplay.textContent = this.currentRound;
    remainingDisplay.textContent = remainingCreeps;
  }

}
