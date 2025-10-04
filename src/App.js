import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('signup'); // Start on signup for testing

  const switchToLogin = () => {
    console.log('Switching to login page');
    setCurrentPage('login');
  };

  const switchToSignup = () => {
    console.log('Switching to signup page');
    setCurrentPage('signup');
  };

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login onSwitchToSignup={switchToSignup} />
      ) : (
        <Signup onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
}

export default App;