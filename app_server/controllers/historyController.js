const GameHistory = require('../models/gameHistory'); // Import the GameHistory model

// Show the history of a player's games and analysis
exports.showHistory = async (req, res) => {
    try {
        // Fetch all history data from the database (e.g., all the player's previous games)
        const history = await GameHistory.find({ userId: req.user._id }); // Assumes userId is saved in the session

        // Render the history page with the data
        res.render('history', {
            title: 'Player History',
            history: history
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving history data");
    }
};

// Store analysis data after each game
exports.storeGameHistory = async (req, res) => {
    try {
        // Assume the analysis data is posted as JSON (BCI usage, scores, etc.)
        const { gameName, bciUsage, analysisData } = req.body;

        const newGameHistory = new GameHistory({
            userId: req.user._id,  // Assuming user authentication
            gameName: gameName,
            bciUsage: bciUsage,
            analysisData: analysisData, // Store the analysis data (could be chart data, stats, etc.)
            timestamp: Date.now()
        });

        await newGameHistory.save();
        res.status(200).send("Game history stored successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error storing game history");
    }
};
