const getAnalysisData = (req, res) => {
    try {
      const sampleData = {
        emotionalStates: [20, 10, 15, 30],
        focus: 70,
        stress: 30,
        calmness: 50
      };
      res.status(200).json(sampleData);
    } catch (error) {
      console.error('Error fetching analysis data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  