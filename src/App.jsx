import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NationalParkApi from './components/NationalParkApi.jsx';
import ParkDetail from './components/ParkDetail';

function App() {
  const [parks, setParks] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/parks/:parkId" element={<ParkDetail parks={parks} />} />
        <Route path="/" element={<NationalParkApi setParksData={setParks} />} />
      </Routes>
    </Router>
  );
}


export default App;
