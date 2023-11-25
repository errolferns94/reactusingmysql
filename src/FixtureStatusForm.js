import React, { useState } from "react";
import axios from "axios";

const FixtureStatusForm = () => {
    const [fixture_num, setFixture_Num] = useState("");
    
    const [fixtureref, setFixtureRef] = useState("");
    const [teamname, setTeamName] = useState("");
    const [teamagainst, setTeamAgainst] = useState("");
    const [message, setMessage] = useState("");
    
    const [error, setError] = useState(null);

    const handleAddFixtureStatus = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/addFixtureStatus", {
                fixture_num,
                fixtureref,
                teamname,
                teamagainst
                
            });
            
            alert("Fixture added successfully updated successfully!");
            console.log(response.data.message);
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.error);
            } else {
                setError("Error adding fixture status data. Please try again later.");
            }
        }
    };

    return (
        <div>
            <h2>Add Fixture Status</h2>
            <div>
                <label>Fixture Number:</label>
                <input type="number" value={fixture_num} onChange={(e) => setFixture_Num(e.target.value)} />
            </div>
            <div>
                <label>Fixture Ref:</label>
                <input type="text" value={fixtureref} onChange={(e) => setFixtureRef(e.target.value)} />
            </div>
            <div>
                <label>Team Name:</label>
                <input type="text" value={teamname} onChange={(e) => setTeamName(e.target.value)} />
            </div>
            <div>
                <label>Against Team Name:</label>
                <input type="text" value={teamagainst} onChange={(e) => setTeamAgainst(e.target.value)} />
            </div>
            <button onClick={handleAddFixtureStatus}>Add Fixture Status</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default FixtureStatusForm;