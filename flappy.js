// Når spilleren rammer et rør, genindlæs siden
function restartGame() {
  location.reload(); // Opdaterer siden og starter spillet forfra
}

// Opdater spillet (tilføjet restartGame() ved død)
function update() {
  smiley.velocity += smiley.gravity;
  smiley.y += smiley.velocity;

  // Rammer jorden eller toppen
  if (smiley.y + smiley.radius >= canvas.height || smiley.y - smiley.radius <= 0) {
    restartGame(); // Genstart spillet
  }

  // Generér nye rør
  if (frame % 100 === 0) {
    let pipeY = Math.random() * (canvas.height - 120 - 50) + 25;
    pipes.push({ x: canvas.width, y: pipeY });
  }

  // Flyt og tjek kollision med rør
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= 2;

    // Kollision
    if (
      smiley.x + smiley.radius > pipes[i].x &&
      smiley.x - smiley.radius < pipes[i].x + 50 &&
      (smiley.y - smiley.radius < pipes[i].y || smiley.y + smiley.radius > pipes[i].y + 120)
    ) {
      restartGame(); // Genstart spillet
    }

    // Fjern rør uden for skærmen
    if (pipes[i].x + 50 < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }

  frame++;
}
