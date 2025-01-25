const saveScore = (score) => {
    // Save the score to the database or session
    // For this example, we're using session storage
    req.session.score = score;
  };
  
  module.exports = { saveScore };
  