//drawing on canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 800;

let isMoved = false;

let isDrawing = false;
let x, y;
ctx.strokeStyle = "black";
ctx.lineWidth = 20;

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  isMoved = false;
  x = e.offsetX;
  y = e.offsetY;
  drawDot(x, y);
  ctx.moveTo(x, y);
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.beginPath();
  if (!isMoved) {
    drawDot(x, y);
  }
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!isDrawing) return;
  isMoved = true;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}
function drawDot(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
}

//selecting color
const colors = [...document.getElementsByClassName("palette_color")];
const selected_color = document.getElementById("selected_color");

const colorLookup = {
  black: "black",
  brown: "#795548",
  red: "#f44335",
  orange: "#ff9800",
  yellow: "#ffeb3a",
  light_green: "#75ff01",
  white: "#ffffff",
  gray: "#9e9e9e",
  dark_green: "#4caf50",
  light_blue: "#80d8ff",
  dark_blue: "#2962ff",
  purple: "#9c27b0",
};

colors.forEach((color) => {
  color.addEventListener("click", () => {
    console.log(color.classList[1]);
    selected_color.style.backgroundColor = colorLookup[color.classList[1]];
    ctx.strokeStyle = colorLookup[color.classList[1]];
  });
});
