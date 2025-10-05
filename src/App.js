import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ApplicationForm from './pages/ApplicationForm';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login onSwitchToSignup={() => setCurrentPage('signup')} />
      )}
      {currentPage === 'signup' && (
        <Signup onSwitchToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'application' && (
        <ApplicationForm onBackToDashboard={() => setCurrentPage('login')} />
      )}
      
      {/* Temporary test button - remove later */}
      <button 
        onClick={() => setCurrentPage('application')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Application Form
      </button>
    </div>
  );
}

export default App;