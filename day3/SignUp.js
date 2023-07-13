import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Google from './Google';
import './signup.css';
function SignUp() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Construct the login redirect URL with parameters
    const loginRedirectUrl = `/login?userName=${encodeURIComponent(userName)}&email=${encodeURIComponent(email)}`;

    // Navigate to the login page with the redirect URL
    window.location.href = loginRedirectUrl;
  };

  useEffect(() => {
    setError('');
    setSuccess('');
  }, [userName, email, password, confirmPassword]);

  const formHandler = (event) => {
    event.preventDefault();

    if (userName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
      setError('Please fill in all fields');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password is weak. Please use a stronger password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Invalid email. Please enter a valid email address.');
      return;
    }

    // If all validation passes, proceed with signup
    handleSignUp();
  };

  const handleSignUp = async () => {
    
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        userName,
        email,
        password,
      });
     
      setSuccess(response.data.message);
      setError('');
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/home', { state: { userName, password } });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError('Error during signup: ' + error.response.data.error);
      } else {
        setError('Error during signup');
      }
      setSuccess('');
    }
  };

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="title" style={{paddingLeft:"40px"}}>Sign Up Form</h1>

      
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{ paddingBottom: '10px',width:"251px" }}
          placeholder="Your UserName"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ paddingBottom: '10px',width:"251px" }}
          placeholder="Your Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                
              </InputAdornment>
            ),
          }}
          variant="outlined"
          className="custom-textfield"
        />
        {error && email.length === 0 && (
          <label className="error-message">Please fill in the email field</label>
        )}
        {error && email.length > 0 && !emailRegex.test(email) && (
          <label className="error-message">Invalid email. Please enter a valid email address.</label>
        )}

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ paddingBottom: '10px',width:"251px" }}
          type="password"
          placeholder="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                
              </InputAdornment>
            ),
          }}
          variant="outlined"
          className="custom-textfield"
        />
        {error && password.length === 0 && (
          <label className="error-message">Please fill in the password field</label>
        )}
        {error && password.length > 0 && !passwordRegex.test(password) && (
          <label className="error-message">Password is weak. Please use a stronger password.</label>
        )}

        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ paddingBottom: '10px',width:"251px" }}
          type="password"
          placeholder="Confirm password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                
              </InputAdornment>
            ),
          }}
          variant="outlined"
          className="custom-textfield"
        />
        {error && confirmPassword.length === 0 && (
          <label className="error-message">Please fill in the confirm password field</label>
        )}
        {error && confirmPassword.length > 0 && password !== confirmPassword && (
          <label className="error-message">Passwords do not match</label>
        )}

        <div className="signup-butt" style={{ paddingBottom: '1px' }}>
         
 

          <Button variant="contained" color="primary" onClick={formHandler} onSubmit={handleFormSubmit} style={{ backgroundColor: 'black',width:"251px"}}>
            Sign Up
          </Button>
        </div>

        <h3 style={{ display: 'flex',alignItems: 'center', paddingLeft: '113px' }}>or</h3>

        <div className="social-login">
          <div className="google" style={{ padding: '5px', display: 'inline-block', paddingTop: '1px' }}>
            <a href="https://www.google.com/">
              <Button startIcon={<Google />} className="social-login-button" style={{ backgroundColor: 'white' }}></Button>
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
            <h5>Already have an Account?</h5>
            <Link to="/login" style={{ marginLeft: '15px' }}>
              <h5>Login</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
