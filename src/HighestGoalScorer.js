import React, { useState, useEffect } from "react";
import axios from "axios";

const HighestGoalScorer = () => {
    const [highestScorer, setHighestScorer] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/getHighestGoalScorer");
                setHighestScorer(response.data.result);
            } catch (error) {
                console.error("Error fetching highest goal scorer:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs once after initial render

    return (
        <div>
            <h2>Highest Goal Scorer</h2>
            {highestScorer ? <p>{highestScorer}</p> : <p>Loading...</p>}
        </div>
    );
};

export default HighestGoalScorer;