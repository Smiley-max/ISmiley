document.addEventListener("DOMContentLoaded", function () {
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

  let pipes = [];
  let frame = 0;
  let score = 0;

  function restartGame() {
    setTimeout(() => {
      location.reload(); // Forsinker reload lidt så man kan se døden
    }, 500);
  }

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      smiley.velocity = smiley.lift;
    }
  });

  function update() {
    smiley.velocity += smiley.gravity;
    smiley.y += smiley.velocity;

    if (smiley.y + smiley.radius >= canvas.height || smiley.y - smiley.radius <= 0) {
      restartGame();
    }

    if (frame % 100 === 0) {
      let pipeY = Math.random() * (canvas.height - 120 - 50) + 25;
      pipes.push({ x: canvas.width, y: pipeY });
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= 2;

      if (
        smiley.x + smiley.radius > pipes[i].x &&
        smiley.x - smiley.radius < pipes[i].x + 50 &&
        (smiley.y - smiley.radius < pipes[i].y || smiley.y + smiley.radius > pipes[i].y + 120)
      ) {
        restartGame();
      }

      if (pipes[i].x + 50 < 0) {
        pipes.splice(i, 1);
        score++;
      }
    }

    frame++;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(smiley.x, smiley.y, smiley.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
      ctx.fillRect(pipe.x, 0, 50, pipe.y);
      ctx.fillRect(pipe.x, pipe.y + 120, 50, canvas.height - pipe.y - 120);
    });

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
