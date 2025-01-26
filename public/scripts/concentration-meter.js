let concentrationData = 0;

function updateConcentrationMeter() {
  const circle = document.getElementById('concentration-circle');
  const text = document.getElementById('circle-text');
  const degree = (concentrationData / 100) * 360;

  // Update circle background (conic-gradient) based on concentration
  circle.style.background = `conic-gradient(#ff6347 0% ${degree}%, #e0e0e0 ${degree}% 100%)`;

  // Update text
  text.textContent = `${concentrationData}%`;
}

function increaseConcentrationMeter() {
  concentrationData = Math.min(100, concentrationData + 1);
  updateConcentrationMeter();
}

// Call increase function periodically (simulating game actions)
setInterval(increaseConcentrationMeter, 1000); // Update every second for demonstration
