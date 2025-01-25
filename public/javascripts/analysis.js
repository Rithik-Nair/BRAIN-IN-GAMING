document.addEventListener('DOMContentLoaded', () => {
    // Fetch game data from localStorage
    const finalScore = localStorage.getItem('finalScore') || 0;
    const concentrationData = JSON.parse(localStorage.getItem('concentrationData')) || [];
  
    // Calculate average concentration
    const totalConcentration = concentrationData.reduce((sum, value) => sum + value, 0);
    const averageConcentration = (totalConcentration / concentrationData.length).toFixed(2);
  
    // Update summary data
    document.getElementById('final-score').textContent = finalScore;
    document.getElementById('average-concentration').textContent = averageConcentration;
  
    // Render concentration line graph
    const ctx = document.getElementById('concentration-chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: concentrationData.map((_, index) => `Time ${index + 1}`),
        datasets: [{
          label: 'Concentration Level',
          data: concentrationData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  });
  // Code to display charts or graphs for analysis
// Using Chart.js for example
const ctx = document.getElementById('score-chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Game 1', 'Game 2', 'Game 3'],
    datasets: [{
      label: 'Score Over Time',
      data: [100, 200, 300], // Example data
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
    }]
  },
});
