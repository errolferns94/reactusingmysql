import React, { useState } from "react";
import axios from "axios";
import "./UpdatePlayerForm.css"; // Import your CSS file
import {useNavigate} from 'react-router-dom';

const UpdatePlayerForm = () => {
    const navigate=useNavigate();
    const [playerId, setPlayerId] = useState("");
    const [incrementGoals, setIncrementGoals] = useState("");

    const home=()=>{
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/updatePlayer/${playerId}`, {
                goals: incrementGoals,
            });
            // Clear the form after successful submission
            setPlayerId("");
            setIncrementGoals("");
            alert("Player details updated successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error updating player details:", error);
            alert("Error updating player details. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Update Player Details</h2>
            <form onSubmit={handleUpdate}>
                <label>Player ID:</label>
                <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                />
                <label>Increment Goals Scored:</label>
                <input
                    type="text"
                    value={incrementGoals}
                    onChange={(e) => setIncrementGoals(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
            <button onClick={home}>Return Home</button>
        </div>
    );
};

export default UpdatePlayerForm;
