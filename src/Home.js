import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Form from './Form';
import UpdatePlayerForm from './UpdatePlayerForm';
import DeletePlayer from './DeletePlayer';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to BRsports</h1>
            <div className="button-container">
                <button onClick={() => navigate("/form")}>Register</button>
                <button onClick={()=>navigate("/update")}>Update</button>
                <button onClick={()=>navigate("/delete")}>Delete</button>
                <button onClick={()=>navigate("/fixture")}>Add Fixtures</button>
                <button onClick={()=>navigate("/goals")}>Check Highest Goal Scorer</button>
                <button onClick={()=>navigate("/teams")}>Check league with most teams</button>
            </div>

        </div>
    )
}

export default Home;
