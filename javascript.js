const container = document.getElementById("container"); // To Select the HTML div container

// To create the 16 * 16 divs
for (let i = 0; i < 16 * 16; i++) { //loop to create 16 * 16 divs (= 256 divs)
  const square = document.createElement("div");
  square.classList.add("square"); // Adds the class "square" to the newly created <div>
  container.appendChild(square);
}
