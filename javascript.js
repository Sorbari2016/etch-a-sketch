// To select the HTML div container and button respectively
const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s * 100, l * 100]; // Returns [H, S, L]
}

// Function to convert HSL to RGB
function hslToRgb(h, s, l) {
  s /= 100, l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r, g, b;

  if (0 <= h && h < 60) { r = c, g = x, b = 0; }
  else if (60 <= h && h < 120) { r = x, g = c, b = 0; }
  else if (120 <= h && h < 180) { r = 0, g = c, b = x; }
  else if (180 <= h && h < 240) { r = 0, g = x, b = c; }
  else if (240 <= h && h < 300) { r = x, g = 0, b = c; }
  else { r = c, g = 0, b = x; }

  return `rgb(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)})`;
}

// Function to darken a color
function darkenColor(color, darknessLevel) {
  let rgbMatch = color.match(/\d+/g);
  let [r, g, b] = rgbMatch.map(Number);
  let [h, s, l] = rgbToHsl(r, g, b);

  l = Math.max(0, l - darknessLevel * 10); // Reduce lightness by 10% per hover
  return hslToRgb(h, s, l);
}

function createGrid(size) {
  container.innerHTML = ""; // Clear previous grid
  container.style.setProperty("--grid-size", size); // Update CSS variable

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.darkness = "0";

  

    square.addEventListener("mouseenter", () => {
      let darkness = parseInt(square.dataset.darkness);
      if (darkness < 10) {
        if (!square.style.backgroundColor || square.style.backgroundColor === "lightgray") {
          square.style.backgroundColor = getRandomColor();
        }
        square.style.backgroundColor = darkenColor(square.style.backgroundColor, darkness);
        square.dataset.darkness = darkness + 1;
      }
    });

    container.appendChild(square);
  }
}

// Initial or default grid setup
createGrid(16);

// Handle resize button click
resizeBtn.addEventListener("click", () => {
  let newSize = prompt("Enter new grid size (max 100):", 16);
  newSize = parseInt(newSize);

  if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Invalid input! Please enter a number between 1 and 100.");
  }
});

