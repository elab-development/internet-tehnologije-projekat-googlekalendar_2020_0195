import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';  
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('pera');
  const [email, setEmail] = useState('pera@gmail.com');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('password');
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword
      });
      console.log('Success:', response.data);
      navigate('/login');

    } catch (error) {
      console.error('Error:', error);
     
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-30 p-b-50">
          <span className="login100-form-title p-b-41">Create Account</span>
          <form className="login100-form validate-form p-b-33 p-t-5" onSubmit={handleSubmit}>
            <div className="wrap-input100 validate-input" data-validate="Enter name">
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="wrap-input100 validate-input" data-validate="Enter email">
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="wrap-input100 validate-input" data-validate="Enter password">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="wrap-input100 validate-input" data-validate="Confirm password">
              <input
                className="input100"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="container-login100-form-btn m-t-32">
              <button className="login100-form-btn" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
