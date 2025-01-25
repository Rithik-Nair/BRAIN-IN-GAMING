let dino = document.getElementById('dino');
let gameContainer = document.getElementById('game-container');
let scoreElement = document.getElementById('score');
let score = 0;
let gameInterval, obstacleInterval;
let isJumping = false;

function startGame() {
  score = 0;
  scoreElement.textContent = `Points: ${score}`;
  gameContainer.innerHTML = '<div id="dino"></div>';
  dino = document.getElementById('dino');
  createObstacles();
  gameInterval = setInterval(moveObstacles, 20);
  document.getElementById('start-button').style.display = 'none';
}

function createObstacles() {
  obstacleInterval = setInterval(() => {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = '100%';
    gameContainer.appendChild(obstacle);
  }, 1500);
}

function moveObstacles() {
  const obstacles = document.querySelectorAll('.obstacle');
  obstacles.forEach(obstacle => {
    const currentLeft = parseFloat(getComputedStyle(obstacle).left);
    if (currentLeft <= -40) {
      obstacle.remove();
      score++;
      scoreElement.textContent = `Points: ${score}`;
    } else {
      obstacle.style.left = `${currentLeft - 2}px`;
    }

    if (collisionDetection(dino, obstacle)) {
      gameOver();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' && !isJumping) {
    isJumping = true;
    dino.style.bottom = '100px';
    setTimeout(() => {
      dino.style.bottom = '10px';
      isJumping = false;
    }, 500);
  }
});

function collisionDetection(dino, obstacle) {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  return !(
    dinoRect.right < obstacleRect.left ||
    dinoRect.left > obstacleRect.right ||
    dinoRect.bottom < obstacleRect.top ||
    dinoRect.top > obstacleRect.bottom
  );
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);
  localStorage.setItem('score', score);
  gameContainer.innerHTML = `
    <h1>Game Over!</h1>
    <p>Your score: ${score}</p>
    <button onclick="startGame()">Play Again</button>
    <button onclick="viewAnalysis()">View Your Analysis</button>
  `;
}

// game.js (Client-side JS)
function viewAnalysis() {
  window.location.href = '/analysis'; // Redirect to the analysis page
}
  