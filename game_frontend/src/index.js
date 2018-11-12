const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let prevX, prevY, currX, currY;

canvas.addEventListener('click', (event) => {
  // debugger
  findxy(event);
  drawRedTri(currX, currY);


})

function drawRedTri(x,y){
  ctx.beginPath();
  ctx.rect(x,y,80,50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}


function findxy(e) {
  prevX = currX;
  prevY = currY;
  currX = e.clientX - canvas.offsetLeft;
  currY = e.clientY - canvas.offsetTop;
}
