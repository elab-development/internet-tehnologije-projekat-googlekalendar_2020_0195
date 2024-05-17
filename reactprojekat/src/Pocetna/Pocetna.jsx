import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './Pocetna.css';
import ImageSlider from './ImageSlider';
 

const Pocetna = () => {
  const navigate = useNavigate(); // Koristimo useNavigate hook za navigaciju u URL

  const handleLoginClick = () => {
    navigate('/login'); // Preusmeravanje na '/login' putanju prilikom klika na dugme za login
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Preusmeravanje na '/register' putanju prilikom klika na dugme za registraciju
  };

  return (
    <div className="pocetna">
      <h1>Dobrodošli na naš kalendar!</h1>
      <p>Kalendar vam pomaže da organizujete svoje obaveze i ostanete produktivni.</p>
      <p>Organizacija je ključna za uspeh, a naš kalendar vam pomaže da ostanete na pravom putu.</p>
      <div className="buttons">
        <button className="login-button" onClick={handleLoginClick}>Ulogujte se</button>
        <button className="register-button" onClick={handleRegisterClick}>Registrujte se</button>
      </div>
      <div className="slider-container">
        <ImageSlider /> {/* Dodavanje slider komponente */}
      </div>

    </div>
  );
};

export default Pocetna;
