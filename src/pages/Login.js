import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login button clicked! Email: ' + email);
    // We'll add real login later
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>KRG Residency System</h1>
        <h2>Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="#signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;