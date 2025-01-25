let concentrationData = []; // Stores concentration levels during the game

function increaseConcentrationMeter() {
  const currentWidth = parseFloat(concentrationMeter.style.width);
  if (currentWidth < 100) {
    concentrationMeter.style.width = `${currentWidth + 10}%`;
    concentrationData.push(currentWidth + 10); // Track concentration data
  }
}

function updateConcentrationMeter() {
  setInterval(() => {
    const currentWidth = parseFloat(concentrationMeter.style.width);
    if (currentWidth > 0) {
      concentrationMeter.style.width = `${currentWidth - 5}%`;
      concentrationData.push(currentWidth - 5); // Track concentration data
    }
  }, 1000);
}

function gameOver() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);

  // Save game data to localStorage for analysis
  localStorage.setItem('finalScore', score);
  localStorage.setItem('concentrationData', JSON.stringify(concentrationData));

  // Redirect to the analysis page
  window.location.href = '/analysis';
}
