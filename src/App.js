import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Simple admin check: if email contains 'admin'
        const adminCheck = user.email.toLowerCase().includes('admin');
        setIsAdmin(adminCheck);
        setCurrentPage(adminCheck ? 'admin-dashboard' : 'dashboard');
      } else {
        setUser(null);
        setIsAdmin(false);
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
        height: '100vh',
        fontSize: '18px',
        color: '#666'
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
      
      {currentPage === 'dashboard' && user && !isAdmin && (
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

      {currentPage === 'admin-dashboard' && user && isAdmin && (
        <AdminDashboard 
          onLogout={() => setCurrentPage('login')}
        />
      )}
    </div>
  );
}

export default App;