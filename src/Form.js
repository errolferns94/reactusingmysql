import React, { useState } from "react";
import axios from "axios";
import "./Form.css"; // Add your CSS file for styling here
import {useNavigate} from 'react-router-dom';

const Form = () => {
    const navigate=useNavigate();
    const [playerId, setPlayerId] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [bookings, setBookings] = useState("");
    const [teamName, setTeamName] = useState("");

    const home=()=>{
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    const handleClick = () =>{
        const playerdetails = [ playerId,playerName,bookings,teamName ];
        axios.post('http://localhost:5000/api/createUser', playerdetails)
        .then(res => {
        
        setTimeout(() => {
            navigate("/");
        }, 2000);    
            
        })
        .catch(err => {
            console.error(err);
            
        });

    }


    return (
        <div className="form-container">
            <h2>Add Players</h2>
            <form onSubmit={handleClick}>
                <label>Player ID:</label>
                <input
                    type="text"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                />
                <label>Player Name:</label>
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <label>Goals:</label>
                <input
                    type="text"
                    value={bookings}
                    onChange={(e) => setBookings(e.target.value)}
                />
                <label>Team Name:</label>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
                <button type="submit">Add Player</button>
                
            </form>
            <button onClick={home}>Return Home</button>
        </div>
    );
};

export default Form;