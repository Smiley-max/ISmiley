const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Spilvariabler
let bird = { x: 50, y: canvas.height / 2, width: 20, height: 20, gravity: 0.6, lift: -15, velocity: 0 };
let pipes = [];
let pipeWidth = 50;
let pipeGap = 200;
let gameOver = false;
let score = 0;

// Sæt canvas størrelse
canvas.width = 400;
canvas.height = 600;

// Start funktion
function startGame() {
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
  spawnPipe();
  requestAnimationFrame(updateGame);
}

// Opdater spillet
function updateGame() {
  if (gameOver) {
    alert("Game Over! Score: " + score);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Tegn fuglen
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Tegn rør og tjek for kollision
  for (let i = pipes.length - 1; i >= 0; i--) {
    let pipe = pipes[i];
    pipe.x -= 2;
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.topHeight + pipeGap, pipeWidth, canvas.height - pipe.topHeight - pipeGap);

    // Kollision
    if (
      bird.x + bird.width > pipe.x &&
      bird.x < pipe.x + pipeWidth &&
      (bird.y < pipe.topHeight || bird.y + bird.height > pipe.topHeight + pipeGap)
    ) {
      gameOver = true;
    }

    if (pipe.x + pipeWidth < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }

  // Spawning af nye rør
  if (pipes[pipes.length - 1]?.x < canvas.width - 200) {
    spawnPipe();
  }

  // Opdater score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Animer igen
  requestAnimationFrame(updateGame);
}

// Spawn et nyt rør
function spawnPipe() {
  let topHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
  pipes.push({ x: canvas.width, topHeight: topHeight });
}

// Tastetryk (op) for at få fuglen til at hoppe
document.addEventListener('keydown', function(e) {
  if (e.key === ' ') { // Brug mellemrumstasten
    bird.velocity = bird.lift;
  }
});

