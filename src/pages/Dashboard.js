import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import './Dashboard.css';

function Dashboard({ onNavigateToApplication, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    if (!user) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'applications'),
        where('userId', '==', user.uid),
        orderBy('submittedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const apps = [];
      
      querySnapshot.forEach((doc) => {
        apps.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setApplications(apps);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications: ' + error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#FFA500';
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading your applications...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.displayName || user?.email}</h1>
          <p>Manage your residency applications</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="actions-bar">
          <button 
            onClick={onNavigateToApplication} 
            className="new-application-button"
          >
            + New Application
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="applications-section">
          <h2>My Applications ({applications.length})</h2>

          {applications.length === 0 ? (
            <div className="no-applications">
              <p>You haven't submitted any applications yet.</p>
              <button onClick={onNavigateToApplication} className="start-button">
                Submit Your First Application
              </button>
            </div>
          ) : (
            <div className="applications-grid">
              {applications.map((app) => (
                <div key={app.id} className="application-card">
                  <div className="card-header">
                    <h3>Application #{app.id.substring(0, 8)}</h3>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(app.status) }}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="card-body">
                    <div className="info-row">
                      <strong>Name:</strong> {app.fullName}
                    </div>
                    <div className="info-row">
                      <strong>Type:</strong> {app.applicationType}
                    </div>
                    <div className="info-row">
                      <strong>Duration:</strong> {app.durationOfStay}
                    </div>
                    <div className="info-row">
                      <strong>Submitted:</strong> {formatDate(app.submittedAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;