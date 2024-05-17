import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Login/Register';
import Navbar from './Nav/Navbar';
import Calendar from './Kalendar/Calendar';
import Modal from './Kalendar/Modal';
import GodisnjiKalendar from './Kalendar/GodisnjiKalendar/GodisnjiKalendar';
import Pocetna from './Pocetna/Pocetna';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [token,setToken]=useState(null);
  useEffect(() => {
    // Provera da li postoji token u sessionStorage
    const token = sessionStorage.getItem('token');
    setToken(token)
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar token={token} setToken={setToken}> </Navbar>
        

        <Routes>
        <Route path="/" element={<Pocetna />} />

          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kalendar/godisnji" element={<GodisnjiKalendar />} />  {/* dodato kesiranje */}

          <Route path="/kalendar" element={<Calendar />} /> {/* dodat pdf generisanje, kategorije dogadjaja, prevlacenje dogadjaja */}
          <Route path="/dodaj" element={<Modal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
