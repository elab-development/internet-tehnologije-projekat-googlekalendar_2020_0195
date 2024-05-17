import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendar } from "react-icons/fa";
import './Navbar.css';
const Navbar = ({token,setToken}) => {
 
  let navigate=useNavigate();


  const handleLogout = async () => {
    try {
      
     
 

      
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      navigate('/login')
      setToken(null)
      sessionStorage.removeItem('token');
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
        {!token ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
           <li>
            <Link to="/kalendar/godisnji">Verski praznici</Link>
            </li>
          <li>
            <Link to="/kalendar">Kalendar</Link>
            </li>
            <li>
            <Link to="/dodaj">Kreiraj dogadjaj</Link>
            </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
