//  To select the HTML div container and button respectively
const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");


function createGrid(size) {
  container.innerHTML = ""; // Clear previous grid
  container.style.setProperty("--grid-size", size); // Update CSS variable

  // To create the number of grids based on input or default
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // Change color on hover
    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "#333";
    });

    square.addEventListener("mouseleave", () => {
      square.style.backgroundColor = "lightgray";
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

  // Condition for input
  if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Invalid input! Please enter a number between 1 and 100.");
  }
});
