import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Google from './Google';
import './login.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { state } = location;

    if (state && state.userName && state.password) {
      setUserName(state.userName);
      setPassword(state.password);
    }
  }, [location]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (userName.length === 0 || password.length === 0) {
      setError(true);
      return;
    }

    try {
      // Send a POST request to the backend API endpoint
      await axios.post('http://localhost:3001/api/login', { userName, password });

      // Login successful, navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="title" style={{ paddingLeft: '60px' }}>
          Login Form
        </h1>

        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ paddingBottom: '10px' }}
          placeholder="Your UserName"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <span role="img" aria-label="User Icon">
                  👤
                </span>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          className="custom-textfield"
        />

        {error && userName.length === 0 && (
          <label className="error-message">Please fill in the username field</label>
        )}

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ paddingBottom: '10px' }}
          type="password"
          placeholder="Your Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <span role="img" aria-label="Lock Icon">
                  🔒
                </span>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          className="custom-textfield"
        />

        {error && password.length === 0 && (
          <label className="error-message">Please fill in the password field</label>
        )}

        <div className="log-but" >
          <Button
            variant="contained"
            color="primary"
            className="login-button"
            onClick={handleFormSubmit}
            style={{ backgroundColor: 'black',width:"251px" }}
          >
            Log In
          </Button>
        </div>

        <h3 style={{ display: 'flex', alignItems: 'center', paddingLeft: '113px' }}>or</h3>
        <div className="social-login">
          <div className="google" style={{ padding: '5px', display: 'inline-block', paddingTop: '1px' }}>
            <a href="https://www.google.com/">
              <Button startIcon={<Google />} className="social-login-button" style={{ backgroundColor: 'white' }}></Button>
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '50px' }}>
            <h5>New Here?</h5>
            <Link to="/" style={{ marginLeft: '15px' }}>
              <h5>Signup</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
