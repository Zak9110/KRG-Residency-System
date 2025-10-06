import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import './AdminDashboard.css';

function AdminDashboard({ onLogout }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    try {
      const q = query(collection(db, 'applications'), orderBy('submittedAt', 'desc'));
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

  const handleStatusChange = async (appId, newStatus) => {
    const confirmed = window.confirm(`Are you sure you want to ${newStatus} this application?`);
    if (!confirmed) return;

    try {
      await updateDoc(doc(db, 'applications', appId), {
        status: newStatus,
        reviewedBy: auth.currentUser.email,
        reviewedAt: new Date()
      });

      // Update local state
      setApplications(applications.map(app => 
        app.id === appId 
          ? { ...app, status: newStatus, reviewedBy: auth.currentUser.email }
          : app
      ));

      alert(`Application ${newStatus} successfully!`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update application: ' + error.message);
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
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Review and manage residency applications</p>
        </div>
        <div className="admin-user-info">
          <span>{auth.currentUser?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className="stat-card approved">
            <div className="stat-number">{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-number">{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
        </div>

        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button 
            className={filter === 'approved' ? 'active' : ''} 
            onClick={() => setFilter('approved')}
          >
            Approved ({stats.approved})
          </button>
          <button 
            className={filter === 'rejected' ? 'active' : ''} 
            onClick={() => setFilter('rejected')}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        <div className="applications-list">
          {filteredApplications.length === 0 ? (
            <div className="no-data">No applications found</div>
          ) : (
            filteredApplications.map((app) => (
              <div key={app.id} className="admin-application-card">
                <div className="card-header-admin">
                  <div>
                    <h3>{app.fullName}</h3>
                    <p className="app-id">ID: {app.id}</p>
                  </div>
                  <span 
                    className="status-badge-admin" 
                    style={{ backgroundColor: getStatusColor(app.status) }}
                  >
                    {app.status.toUpperCase()}
                  </span>
                </div>

                <div className="card-body-admin">
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Email:</strong> {app.userEmail}
                    </div>
                    <div className="info-item">
                      <strong>Phone:</strong> {app.phoneNumber}
                    </div>
                    <div className="info-item">
                      <strong>Nationality:</strong> {app.nationality}
                    </div>
                    <div className="info-item">
                      <strong>ID/Passport:</strong> {app.passportNumber}
                    </div>
                    <div className="info-item">
                      <strong>Duration:</strong> {app.durationOfStay}
                    </div>
                    <div className="info-item">
                      <strong>Submitted:</strong> {formatDate(app.submittedAt)}
                    </div>
                  </div>

                  <div className="info-section">
                    <strong>Address:</strong>
                    <p>{app.currentAddress}</p>
                  </div>

                  <div className="info-section">
                    <strong>Reason for Residency:</strong>
                    <p>{app.reasonForResidency}</p>
                  </div>

                  {app.reviewedBy && (
                    <div className="review-info">
                      <small>Reviewed by {app.reviewedBy} on {formatDate(app.reviewedAt)}</small>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    onClick={() => handleStatusChange(app.id, 'approved')}
                    className="approve-button"
                    disabled={app.status === 'approved'}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, 'rejected')}
                    className="reject-button"
                    disabled={app.status === 'rejected'}
                  >
                    ✗ Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(app.id, 'pending')}
                    className="pending-button"
                    disabled={app.status === 'pending'}
                  >
                    ↻ Reset to Pending
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;