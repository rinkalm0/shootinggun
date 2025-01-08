// app.js
const gun = document.getElementById("gun");
const items = document.querySelectorAll(".item");
const bulletsLeftDisplay = document.getElementById("bullets-left");
const statusDisplay = document.getElementById("status");

let bulletsLeft = 10;
let activeItems = Array.from(items).slice(0,5);
let gunPosition = 50; // Start at the center of the container

// Move the gun
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && gunPosition > 0) {
    gunPosition -= 5;
    gun.style.left = `${gunPosition}%`;
  } else if (e.key === "ArrowRight" && gunPosition < 100) {
    gunPosition += 5;
    gun.style.left = `${gunPosition}%`;
  }
});

// Shoot
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (bulletsLeft > 0) {
      shoot();
    } else {
      statusDisplay.textContent = "Game Over! No bullets left.";
    }
  }
});

// Shooting logic
function shoot() {
  bulletsLeft--;
  bulletsLeftDisplay.textContent = `Bullets Left: ${bulletsLeft}`;

  // Check if any item is in range
  const gunRect = gun.getBoundingClientRect();
  let hit = false;

  activeItems.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    if (
      itemRect.left < gunRect.right &&
      itemRect.right > gunRect.left &&
      itemRect.bottom > gunRect.top
    ) {
      item.style.visibility = "hidden"; // Vanish the item
      activeItems = activeItems.filter((i) => i !== item); // Remove from active list
      hit = true;
    }
  });

  if (!hit) {
    statusDisplay.textContent = "Missed!";
  } else {
    statusDisplay.textContent = "Hit!";
  }

  if (activeItems.length === 0) {
    statusDisplay.textContent = "You win!";
    document.removeEventListener("keydown", shoot);
  } else if (bulletsLeft === 0) {
    statusDisplay.textContent = "Game Over! No bullets left.";
  }
}

// Moving items (top to bottom)
function moveItems() {
  activeItems.forEach((item) => {
    let position = 0; // Start at the top of the container
    let speed = Math.random() * 1 + 0; // Random speed for each item

    function animate() {
      position += speed;

      // Reset the item's position if it moves out of bounds
      if (position > 100) {
        position = -10; // Start above the container
        speed = Math.random() * 1 + 0; // Reset speed
      }

      item.style.top = `${position}%`;

      // Continue animation while the item is active
      if (activeItems.includes(item)) {
        requestAnimationFrame(animate);
      }
    }

    item.style.position = "absolute";
    item.style.left = `${Math.random() * 90}%`; // Random initial horizontal position
    item.style.top = `${position}%`;

    animate();
  });
}

// Start moving items
moveItems();


