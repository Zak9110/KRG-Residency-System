import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <Login onSwitchToSignup={() => setCurrentPage('signup')} />
      ) : (
        <Signup onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  );
}

export default App;