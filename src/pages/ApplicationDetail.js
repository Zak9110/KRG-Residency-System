import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useParams } from 'react-router-dom';

const ApplicationDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const docRef = doc(db, 'applications', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setApplication({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching application:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!application) return <div className="error">Application not found</div>;

  return (
    <div className="application-detail">
      <h2>Application Details</h2>
      
      <div className="detail-section">
        <h3>Personal Information</h3>
        <p><strong>Full Name:</strong> {application.fullName}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Nationality:</strong> {application.nationality}</p>
      </div>

      <div className="detail-section">
        <h3>Application Information</h3>
        <p><strong>Type:</strong> {application.residencyType}</p>
        <p><strong>Status:</strong> <span className={`status-badge ${application.status}`}>{application.status}</span></p>
        <p><strong>Submitted:</strong> {new Date(application.submittedAt).toLocaleString()}</p>
      </div>

      <div className="detail-section">
        <h3>Documents</h3>
        {application.documents && Object.entries(application.documents).map(([key, url]) => (
          <div key={key}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              View {key.replace(/([A-Z])/g, ' $1').trim()}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDetail;