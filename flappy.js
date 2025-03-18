const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Spillerens indstillinger
const smiley = {
  x: 100,
  y: canvas.height / 2,
  radius: 20,
  velocity: 0,
  gravity: 0.5,
  lift: -10,
};

// Rør
const pipes = [];
let score = 0;
let frame = 0;

// Start spillet
function startGame() {
  score = 0;
  smiley.y = canvas.height / 2;
  smiley.velocity = 0;
  pipes.length = 0; // Tøm rørene
  frame = 0;
}

// Genstart spillet
function restartGame() {
  startGame();
  alert("Game Over! Try again.");
}

// Tegn spillet
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Ryd skærmen

  // Tegn spilleren
  ctx.beginPath();
  ctx.arc(smiley.x, smiley.y, smiley.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFD700"; // Smiley farve
  ctx.fill();
  ctx.closePath();

  // Tegn rør
  for (let i = 0; i < pipes.length; i++) {
    ctx.fillStyle = "#228B22"; // Grøn farve til rør
    ctx.fillRect(pipes[i].x, 0, 50, pipes[i].y); // Øvre rør
    ctx.fillRect(pipes[i].x, pipes[i].y + 120, 50, canvas.height - pipes[i].y - 120); // Nedre rør
  }

  // Vis score
  ctx.font = "24px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText("Score: " + score, 20, 30);
}

// Opdater spillet
function update() {
  smiley.velocity += smiley.gravity;
  smiley.y += smiley.velocity;

  // Forhindrer spilleren i at gå udenfor skærmen
  if (smiley.y + smiley.radius >= canvas.height) {
    smiley.y = canvas.height - smiley.radius; // Sætter spilleren på jorden
    smiley.velocity = 0; // Stopper faldet
  }
  if (smiley.y - smiley.radius <= 0) {
    smiley.y = smiley.radius; // Sætter spilleren på toppen
    smiley.velocity = 0; // Stopper opadgående bevægelse
  }

  // Generér nye rør
  if (frame % 100 === 0) {
    let pipeY = Math.random() * (canvas.height - 120 - 50) + 25;
    pipes.push({ x: canvas.width, y: pipeY });
  }

  // Flyt og tjek kollision med rør
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= 2;

    // Kollision med rørene
    if (
      smiley.x + smiley.radius > pipes[i].x &&
      smiley.x - smiley.radius < pipes[i].x + 50 &&
      (smiley.y - smiley.radius < pipes[i].y || smiley.y + smiley.radius > pipes[i].y + 120)
    ) {
      restartGame(); // Genstart spillet ved kollision
    }

    // Fjern rør uden for skærmen
    if (pipes[i].x + 50 < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }

  frame++;
}

// Håndter input (f.eks. hop)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    smiley.velocity = smiley.lift; // Sæt fart for at hoppe
  }
});

// Hoved spil loop
function gameLoop() {
  draw();
  update();
  requestAnimationFrame(gameLoop); // Animer næste frame
}

// Start spillet når siden er indlæst
window.onload = () => {
  startGame();
  gameLoop(); // Start spillet
};
