const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

let isDrawing = false;
let x, y;
ctx.strokeStyle = "black";
ctx.lineWidth = 20;

function startDrawing(e) {
  isDrawing = true;
  // Use 'e.touches[0]' for touch events and 'e' for mouse events
  const { offsetX, offsetY } = getOffset(e);
  x = offsetX;
  y = offsetY;
  drawDot(x, y);
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;
  const { offsetX, offsetY } = getOffset(e);

  ctx.lineCap = "round";
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
}

function getOffset(e) {
  // Check if it's a touch event
  if (e.touches) {
    // Adjust for touch event offset
    let rect = e.target.getBoundingClientRect();
    let offsetX = e.touches[0].clientX - rect.left;
    let offsetY = e.touches[0].clientY - rect.top;
    return { offsetX, offsetY };
  } else {
    // Mouse event offset
    return { offsetX: e.offsetX, offsetY: e.offsetY };
  }
}

function drawDot(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, true);
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

// Adding touch event listeners
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent scrolling when touching the canvas
  startDrawing(e);
});

canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault(); // Prevent scrolling when touching the canvas
  draw(e);
});

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
    selected_color.style.backgroundColor = colorLookup[color.id];
    ctx.strokeStyle = colorLookup[color.id];
  });
});

//clear button
const clearButton = document.getElementsByClassName("clear");

clearButton[0].addEventListener("click", () => {
  //refresh page
  // location.reload();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//selecting size

const selector_form = document.getElementsByClassName("brush-size-form");
const selector = document.getElementById("brush_size_select");
const blank_option = document.getElementById("blank");
const slider = document.getElementById("size-slider");

selector_form[0].addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
  selected_color.style.width = e.target.value + "px";
  selected_color.style.height = e.target.value + "px";
  slider.value = e.target.value;
  blank_option.innerText = "";
});

//size-slider

slider.addEventListener("input", (e) => {
  ctx.lineWidth = e.target.value;
  selected_color.style.width = e.target.value + "px";
  selected_color.style.height = e.target.value + "px";
  blank_option.value = e.target.value;
  blank_option.innerText = e.target.value;
  brush_size_select.value = e.target.value;
});

//Zoom
const zoom = document.getElementById("zoom-slider");

zoom.addEventListener("input", (e) => {
  canvas.style.transform = `scale(${e.target.value})`;
  console.log(e.target.value);
});
