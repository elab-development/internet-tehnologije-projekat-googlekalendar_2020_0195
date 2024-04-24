import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCalendar } from "react-icons/fa";
import './Navbar.css';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Provera da li postoji token u sessionStorage
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(token !== null);
  }, []);

  const handleLogout = async () => {
    try {
      
      sessionStorage.removeItem('token');
      setIsLoggedIn(false);

      
      await axios.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"> <FaCalendar /></Link>
      </div>
      <ul className="nav-links">
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
