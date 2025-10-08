import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../services/firebase';
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import './ApplicationForm.css';

function ApplicationForm({ onBackToDashboard }) {
  const [formData, setFormData] = useState({
    applicationType: 'iraqi-citizen',
    fullName: '',
    dateOfBirth: '',
    nationality: 'Iraqi',
    passportNumber: '',
    phoneNumber: '',
    currentAddress: '',
    reasonForResidency: '',
    durationOfStay: '3-months'
  });
  const [files, setFiles] = useState({
    idDocument: null,
    proofOfAddress: null
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      // Check file size (max 5MB)
      if (selectedFiles[0].size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setFiles(prev => ({
        ...prev,
        [name]: selectedFiles[0]
      }));
      setError('');
    }
  };

  const uploadFile = async (file, folder) => {
    if (!file) return null;
    
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${auth.currentUser.uid}/${fileName}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);
    setError('');

    try {
      const user = auth.currentUser;
      
      if (!user) {
        setError('You must be logged in to submit an application');
        setLoading(false);
        setUploading(false);
        return;
      }

      // Upload documents
      let idDocumentURL = null;
      let proofOfAddressURL = null;

      if (files.idDocument) {
        idDocumentURL = await uploadFile(files.idDocument, 'id-documents');
      }

      if (files.proofOfAddress) {
        proofOfAddressURL = await uploadFile(files.proofOfAddress, 'address-proofs');
      }

      // Add application to Firestore
      const docRef = await addDoc(collection(db, 'applications'), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        documents: {
          idDocument: idDocumentURL,
          proofOfAddress: proofOfAddressURL
        },
        submittedAt: serverTimestamp(),
        reviewedAt: null,
        reviewedBy: null,
        reviewNotes: ''
      });

      console.log('Application submitted with ID:', docRef.id);
      alert('Application submitted successfully! Application ID: ' + docRef.id);
      
      // Reset form
      setFormData({
        applicationType: 'iraqi-citizen',
        fullName: '',
        dateOfBirth: '',
        nationality: 'Iraqi',
        passportNumber: '',
        phoneNumber: '',
        currentAddress: '',
        reasonForResidency: '',
        durationOfStay: '3-months'
      });

      setFiles({
        idDocument: null,
        proofOfAddress: null
      });

      if (onBackToDashboard) {
        onBackToDashboard();
      }

    } catch (error) {
      console.error('Error submitting application:', error);
      setError('Failed to submit application: ' + error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="application-form-container">
      <div className="application-form-box">
        <h1>Residency Application Form</h1>
        <h2>Iraqi Citizens from Other Provinces</h2>

        {error && <div className="error-message">{error}</div>}
        {uploading && <div className="upload-message">Uploading documents... Please wait.</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Personal Information</h3>

            <div className="input-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Nationality *</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>National ID / Passport Number *</label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                placeholder="Enter ID or passport number"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+964 XXX XXX XXXX"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Current Address *</label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                placeholder="Enter your current address"
                rows="3"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Residency Details</h3>

            <div className="input-group">
              <label>Reason for Residency *</label>
              <textarea
                name="reasonForResidency"
                value={formData.reasonForResidency}
                onChange={handleChange}
                placeholder="Explain why you need residency in Kurdistan Region"
                rows="4"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Duration of Stay *</label>
              <select
                name="durationOfStay"
                value={formData.durationOfStay}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="3-months">3 Months</option>
                <option value="6-months">6 Months</option>
                <option value="1-year">1 Year</option>
                <option value="2-years">2 Years</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Required Documents</h3>

            <div className="input-group">
              <label>ID Document / Passport Copy </label>
              <input
                type="file"
                name="idDocument"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                //required
                disabled={loading}
              />
              {files.idDocument && (
                <small className="file-info">Selected: {files.idDocument.name}</small>
              )}
              <small className="file-help">Accepted: PDF, JPG, PNG (Max 5MB)</small>
            </div>

            <div className="input-group">
              <label>Proof of Address </label>
              <input
                type="file"
                name="proofOfAddress"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                //required
                disabled={loading}
              />
              {files.proofOfAddress && (
                <small className="file-info">Selected: {files.proofOfAddress.name}</small>
              )}
              <small className="file-help">Accepted: PDF, JPG, PNG (Max 5MB)</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (uploading ? 'Uploading...' : 'Submitting...') : 'Submit Application'}
            </button>
            {onBackToDashboard && (
              <button 
                type="button" 
                className="cancel-button" 
                onClick={onBackToDashboard}
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;