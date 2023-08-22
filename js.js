const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

let isDrawing = false;
let x, y;
ctx.strokeStyle = "black";
ctx.lineWidth = 20;

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!isDrawing) return;

  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}
