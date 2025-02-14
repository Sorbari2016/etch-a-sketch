const container = document.getElementById("container"); // Select the HTML div container

// Create the 16 * 16 grid
for (let i = 0; i < 16 * 16; i++) {  
  const square = document.createElement("div");
  square.classList.add("square"); // Adds the class "square" to the new div

  // Change color on hover
  square.addEventListener("mouseenter", () => {
    square.style.backgroundColor = "#333"; // Change to any color
  });

  // Revert color when mouse leaves
  square.addEventListener("mouseleave", () => {
    square.style.backgroundColor = "lightgray"; // Reset to original color
  });

  container.appendChild(square);
}

