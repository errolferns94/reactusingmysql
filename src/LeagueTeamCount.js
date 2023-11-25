import React, { useState } from "react";
import axios from "axios";

const LeagueTeamCount = () => {
    const [mostTeamsLeague, setMostTeamsLeague] = useState(null);

    const handleButtonClick = () => {
        axios.get("http://localhost:5000/api/findMostTeamsLeague").then((response) => {
            setMostTeamsLeague(response.data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    return (
        <div>
            <h2>League with Most Teams</h2>
            <button onClick={handleButtonClick}>Find Most Teams League</button>
            {mostTeamsLeague ? (
                <p>
                    <strong>League Name:</strong> {mostTeamsLeague.league_name},{" "}
                    <strong>Team Count:</strong> {mostTeamsLeague.team_count}
                </p>
            ) : (
                <p>Click the button to find the most teams league.</p>
            )}
        </div>
    );
};

export default LeagueTeamCount;
