import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NationalParkApi from './components/NationalParkApi.jsx';
import ParkDetail from './components/ParkDetail';
import Navbar from './components/NavBar.jsx';
import '/src/App.css'


function App() {
  const [parks, setParks] = useState([]);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/parks/:parkId" element={<ParkDetail parks={parks} />} />
        <Route path="/" element={<NationalParkApi setParksData={setParks} />} />
      </Routes>
    </Router>
  );
}


export default App;
