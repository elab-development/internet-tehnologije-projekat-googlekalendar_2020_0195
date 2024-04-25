import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Login/Register';
import Navbar from './Nav/Navbar';
import Calendar from './Kalendar/Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kalendar" element={<Calendar />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
