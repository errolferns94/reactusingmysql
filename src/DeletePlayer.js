import React, { useState } from "react";
import axios from "axios";
import './DeletePlayer.css';
import {useNavigate} from 'react-router-dom';


const DeletePlayer = () => {
    const navigate=useNavigate(); 
    const [playerId, setPlayerId] = useState("");

    const home = () => {
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/deletePlayer/${playerId}`);
            // Clear the form after successful deletion
            setPlayerId("");
            alert("Player deleted successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error deleting player:", error);
            alert("Error deleting player. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Delete Player</h2>
            <label>Player ID:</label>
            <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
            />
            <button onClick={handleDelete}>Delete</button>
            <button onClick={home}>Return Home</button>
        </div>
    );
};

export default DeletePlayer;
