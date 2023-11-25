import React from 'react';

import { useNavigate, Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Form from './Form';
import UpdatePlayerForm from './UpdatePlayerForm';
import DeletePlayer from './DeletePlayer';
import FixtureStatusForm from './FixtureStatusForm';
import HighestGoalScorer from './HighestGoalScorer';
import LeagueTeamCount from './LeagueTeamCount';



function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/update' element={<UpdatePlayerForm/>}/>
        <Route path='/delete' element={<DeletePlayer/>}/>
        <Route path='/fixture' element={<FixtureStatusForm/>}/>
        <Route path='/goals' element={<HighestGoalScorer/>}/>
        <Route path='/teams' element={<LeagueTeamCount/>}/>
      </Routes>
      </div>
  );
}

export default App;