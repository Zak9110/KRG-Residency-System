import React, { useState } from 'react';
import './Signup.css';

function Signup({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'applicant'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    alert('Sign up successful! Name: ' + formData.fullName + ', Email: ' + formData.email);
    // We'll add real signup later
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>KRG Residency System</h1>
        <h2>Create Account</h2>
        
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              minLength="6"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="input-group">
            <label>I am a:</label>
            <select name="userType" value={formData.userType} onChange={handleChange}>
              <option value="applicant">Applicant</option>
              <option value="official">Government Official</option>
            </select>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="login-link">
            Already have an account? <button type="button" onClick={onSwitchToLogin} className="link-button">Login</button>
        </p>
      </div>
    </div>
  );
}

export default Signup;