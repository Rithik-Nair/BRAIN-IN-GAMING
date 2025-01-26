let dino = document.getElementById('dino');
let gameContainer = document.getElementById('game-container');
let scoreElement = document.getElementById('score');
let score = 0;
let gameInterval, obstacleInterval;
let isJumping = false;
let concentrationData = 50; // Example value for concentration level (between 0 and 100)

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

// Redirect to analysis page (for future functionality)
function viewAnalysis() {
  window.location.href = '/analysis'; // Redirect to the analysis page
}

// Update concentration meter
function updateConcentrationMeter() {
  concentrationData = Math.floor(Math.random() * 100); // Random concentration data for demo purposes
  gaugeChart.data.datasets[0].data = [concentrationData, 100 - concentrationData];
  gaugeChart.options.elements.center.text = `${concentrationData}%`;
  gaugeChart.update();
}

// Initialize the concentration meter chart (Chart.js)
let concentrationMeterCanvas = document.getElementById('concentration-meter');
let gaugeChart = new Chart(concentrationMeterCanvas, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [concentrationData, 100 - concentrationData],
      backgroundColor: ['#ff6347', '#e0e0e0'],
      borderWidth: 0
    }]
  },
  options: {
    circumference: Math.PI,
    rotation: Math.PI,
    cutoutPercentage: 80,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true
    },
    tooltips: {
      enabled: false
    },
    elements: {
      center: {
        text: `${concentrationData}%`, // Label to show concentration data
        fontStyle: 'Arial',
        fontSize: 30,
        fontColor: '#ff6347'
      }
    },
    scale: {
      display: true,
      position: 'top',
      ticks: {
        min: 0,
        max: 100,
        stepSize: 10,
        fontColor: '#333'
      },
      gridLines: {
        color: '#e0e0e0'
      }
    },
    legend: {
      display: false
    }
  }
});

// Update concentration meter every 2 seconds (example)
setInterval(updateConcentrationMeter, 2000);
