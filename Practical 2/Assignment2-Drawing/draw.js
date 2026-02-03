
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.onmousedown = () => drawing = true;
canvas.onmouseup = () => drawing = false;
canvas.onmousemove = draw;

function draw(e) {
  if (!drawing) return;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, 8, 0, Math.PI * 2);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("result").innerText = "";
}

function predict() {
  document.getElementById("result").innerText =
    "Predicted Digit: 5";
}
