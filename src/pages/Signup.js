import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';
import './Signup.css';

function Signup({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'applicant'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      console.log('User created successfully:', userCredential.user);
      alert('Account created successfully! You can now login.');
      
      // Switch to login page
      if (onSwitchToLogin) {
        onSwitchToLogin();
      }

    } catch (error) {
      console.error('Signup error:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered!');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address!');
          break;
        case 'auth/weak-password':
          setError('Password is too weak!');
          break;
        default:
          setError('Failed to create account: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>KRG Residency System</h1>
        <h2>Create Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>I am a:</label>
            <select 
              name="userType" 
              value={formData.userType} 
              onChange={handleChange}
              disabled={loading}
            >
              <option value="applicant">Applicant</option>
              <option value="official">Government Official</option>
            </select>
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? 
          <button 
            type="button" 
            onClick={onSwitchToLogin} 
            className="link-button"
            disabled={loading}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;