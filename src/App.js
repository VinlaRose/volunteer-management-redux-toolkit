import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { VolunteerPage } from './Page/Volunteer';
import { EventsPage } from './Page/Event';

function App() {
  return (
    <div>
      <nav>
            <ul>
              <li>
                
                <Link to="/volunteers">Volunteers</Link>
              </li>
              <li>
                <Link to="/">Events</Link>
              </li>
              <li>
                <Link to="https://github.com/VinlaRose/volunteer-management-redux-toolkit">Github</Link>
              </li>
             
              
            </ul>
      </nav>
          
      <Routes>
        <Route path="/volunteers" element={<VolunteerPage/>} />
        <Route path="/" element={<EventsPage/>} />  
      </Routes>
    </div>
  );
}

export default App;
