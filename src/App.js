import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle browser back button - go to home
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    
    // Push initial state
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update browser history when page changes
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
  }, [currentPage]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const adminCheck = user.email.toLowerCase().includes('admin');
        setIsAdmin(adminCheck);
        
        if (currentPage === 'home' || currentPage === 'login' || currentPage === 'signup') {
          setCurrentPage(adminCheck ? 'admin-dashboard' : 'dashboard');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        if (currentPage !== 'home' && currentPage !== 'login' && currentPage !== 'signup') {
          setCurrentPage('home');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentPage]);

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
      {currentPage === 'home' && (
        <Home 
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToSignup={() => setCurrentPage('signup')}
        />
      )}

      {currentPage === 'login' && (
        <Login onSwitchToSignup={() => setCurrentPage('signup')} />
      )}
      
      {currentPage === 'signup' && (
        <Signup onSwitchToLogin={() => setCurrentPage('login')} />
      )}
      
      {currentPage === 'dashboard' && user && !isAdmin && (
        <Dashboard 
          onNavigateToApplication={() => setCurrentPage('application')}
          onLogout={() => setCurrentPage('home')}
        />
      )}
      
      {currentPage === 'application' && user && (
        <ApplicationForm 
          onBackToDashboard={() => setCurrentPage('dashboard')}
        />
      )}

      {currentPage === 'admin-dashboard' && user && isAdmin && (
        <AdminDashboard 
          onLogout={() => setCurrentPage('home')}
        />
      )}
    </div>
  );
}

export default App;