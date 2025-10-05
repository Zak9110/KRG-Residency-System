import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setCurrentPage('dashboard');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login onSwitchToSignup={() => setCurrentPage('signup')} />
      )}
      
      {currentPage === 'signup' && (
        <Signup onSwitchToLogin={() => setCurrentPage('login')} />
      )}
      
      {currentPage === 'dashboard' && user && (
        <Dashboard 
          onNavigateToApplication={() => setCurrentPage('application')}
          onLogout={() => setCurrentPage('login')}
        />
      )}
      
      {currentPage === 'application' && user && (
        <ApplicationForm 
          onBackToDashboard={() => setCurrentPage('dashboard')}
        />
      )}
    </div>
  );
}

export default App;