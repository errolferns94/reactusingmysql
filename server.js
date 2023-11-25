// Importing necessary modules

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a MySQL connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "errol", // Change this to your database name
});

// Connect to the database


db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

// Define API route for creating a user profile

app.post("/api/createUser", (req, res) => {
    const [playerid, playername, goals, teamname] = req.body;

    const insertQuery =
        "INSERT INTO players (playerid,playername,goals,teamname) VALUES (?, ?, ?, ?)";
    const values = [playerid, playername, goals, teamname];

    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error("Error creating user profile:", err);
            res.status(500).json({ message: "Error creating user profile" });
            return;
        }
        console.log(values);
        console.log("User profile created successfully");
        res.json({ message: "User profile created successfully" });
    });
});

// Define API route for fetching user profiles

app.get("/api/displayUser", (req, res) => {
    // Define the SELECT query
    const selectQuery = "SELECT * FROM players";

    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error("Error fetching user profiles:", err);
            res.status(500).json({ message: "Error fetching user profiles" });
            return;
        }
        res.json(results);
    });
});

// Define API route for updating player details
app.put("/api/updatePlayer/:playerId", (req, res) => {
    const playerId = req.params.playerId;
    const { goals } = req.body;

    const updateQuery = "UPDATE players SET Goals = Goals + ? WHERE playerid = ?";
    const values = [goals, playerId];

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error("Error updating player details:", err);
            res.status(500).json({ message: "Error updating player details" });
            return;

        }
        const updateQuery = "UPDATE players SET Bookings = 0 WHERE Playerid = NEW.Playerid";
        console.log("Player details updated successfully");
        res.json({ message: "Player details updated successfully" });

    });
});

// Define API route for adding fixture status data
app.post("/api/addFixtureStatus", (req, res) => {
    const { fixture_num, fixtureref, teamname, teamagainst } = req.body;

    const insertQuery =
        "INSERT INTO fixture_status (fixture_num, fixtureref, teamname, teamagainst) VALUES (?, ?, ?, ?)";
    const values = [fixture_num, fixtureref, teamname, teamagainst];

    db.query(insertQuery, [fixture_num, fixtureref, teamname, teamagainst], (err, result) => {
        if (err && err.sqlState === '45000') {
            // Custom error message from the trigger
            return res.status(400).json({ error: err.sqlMessage });
        }

        if (err) {
            console.error("Error adding fixture status data:", err);
            return res.status(500).json({ message: "Error adding fixture status data" });
        }
        else {
            console.log("Fixture status data added successfully");
            res.json({ message: "Fixture status data added successfully" });
        }
    });
});

// Define API route for deleting a player
app.delete("/api/deletePlayer/:playerId", (req, res) => {
    const playerId = req.params.playerId;

    const deleteQuery = "DELETE FROM players WHERE playerid = ?";

    db.query(deleteQuery, [playerId], (err, result) => {
        if (err) {
            console.error("Error deleting player:", err);
            res.status(500).json({ message: "Error deleting player" });
            return;
        }
        console.log("Player deleted successfully");
        res.json({ message: "Player deleted successfully" });
    });
});

// Define API route for getting the highest goal scorer and team name
app.get("/api/getHighestGoalScorer", (req, res) => {
    const getHighestGoalScorerQuery = `
        SELECT CONCAT(playername, ' (', teamname, ')') AS highest_scorer
        FROM players
        ORDER BY goals DESC
        LIMIT 1;
    `;

    db.query(getHighestGoalScorerQuery, (err, result) => {
        if (err) {
            console.error("Error fetching highest goal scorer:", err);
            res.status(500).json({ error: "Error fetching highest goal scorer" });
            return;
        }

        if (result.length > 0) {
            res.json({ result: result[0].highest_scorer });
        } else {
            res.json({ result: "No data available" });
        }
    });
});

app.get("/api/findMostTeamsLeague", (req, res) => {
    db.query("call errol.FindLeagueWithMostTeams();", (error, results) => {
        if (error) {
            console.error("Error calling the procedure: ", error);
            res.status(500).json({ error: "Error calling the procedure" });
        } else {
            res.json(results[0][0]);
        }
    });
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
