const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Smiley-karakter
const smiley = {
  x: 50,
  y: 250,
  radius: 15,
  gravity: 0.5,
  lift: -10,
  velocity: 0
};

// Rør
const pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;
let frame = 0;
let score = 0;

// Hop når man trykker på mellemrum
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    smiley.velocity = smiley.lift;
  }
});

// Opdater spillet
function update() {
  smiley.velocity += smiley.gravity;
  smiley.y += smiley.velocity;

  // Rammer jorden eller toppen
  if (smiley.y + smiley.radius >= canvas.height || smiley.y - smiley.radius <= 0) {
    resetGame();
  }

  // Generér nye rør
  if (frame % 100 === 0) {
    let pipeY = Math.random() * (canvas.height - pipeGap - 50) + 25;
    pipes.push({ x: canvas.width, y: pipeY });
  }

  // Flyt og tjek kollision med rør
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= pipeSpeed;

    // Kollision
    if (
      smiley.x + smiley.radius > pipes[i].x &&
      smiley.x - smiley.radius < pipes[i].x + pipeWidth &&
      (smiley.y - smiley.radius < pipes[i].y || smiley.y + smiley.radius > pipes[i].y + pipeGap)
    ) {
      resetGame();
    }

    // Fjern rør uden for skærmen
    if (pipes[i].x + pipeWidth < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }

  frame++;
}

// Tegn spillet
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Tegn smiley
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(smiley.x, smiley.y, smiley.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Tegn rør
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
    ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);
  });

  // Tegn score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Nulstil spillet
function resetGame() {
  smiley.y = 250;
  smiley.velocity = 0;
  pipes.length = 0;
  score = 0;
  frame = 0;
}

// Kør spillet
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
