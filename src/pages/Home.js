import React, { useState } from 'react';
import './Home.css';

function Home({ onNavigateToLogin, onNavigateToSignup }) {
  const [language, setLanguage] = useState('en');

  return (
    <div className="home-professional">
      {/* Top Bar */}
      <div className="top-bar-pro">
        <div className="top-bar-container">
          <div className="top-left">
            <span className="top-link">📞 +964 66 254 0892</span>
            <span className="top-divider">|</span>
            <span className="top-link">✉️ info@krg-residency.gov.krd</span>
          </div>
          <div className="lang-switcher-pro">
            <button 
              className={language === 'en' ? 'active' : ''} 
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            <button 
              className={language === 'ku' ? 'active' : ''} 
              onClick={() => setLanguage('ku')}
            >
              کوردی
            </button>
            <button 
              className={language === 'ar' ? 'active' : ''} 
              onClick={() => setLanguage('ar')}
            >
              عربي
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-pro">
        <div className="header-container">
          <div className="logo-area">
            <img 
              src="https://gov.krd/media/1099/govkrdlogobig.svg" 
              alt="KRG Logo" 
              className="krg-logo"
            />
            <div className="brand-text">
              <h1>Kurdistan Regional Government</h1>
              <p>Digital Residency Management System</p>
            </div>
          </div>
          <nav className="nav-pro">
            <a href="#home" className="nav-link-pro active">Home</a>
            <a href="#services" className="nav-link-pro">Services</a>
            <a href="#about" className="nav-link-pro">About</a>
            <a href="#contact" className="nav-link-pro">Contact</a>
            <button onClick={onNavigateToLogin} className="btn-login-pro">Login</button>
            <button onClick={onNavigateToSignup} className="btn-signup-pro">Apply Now</button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Clean */}
      <section className="hero-clean">
        <div className="hero-container-clean">
          <div className="hero-content-clean">
            <div className="hero-badge-clean">
              <span className="badge-dot"></span>
              <span>Official Government Service</span>
            </div>
            <h1 className="hero-title-clean">
              Digital Residency<br />
              Application System
            </h1>
            <p className="hero-desc-clean">
              Apply for your Kurdistan Region residency permit online through our secure, 
              efficient, and transparent digital platform. Process your application in days, not weeks.
            </p>
            <div className="hero-buttons-clean">
              <button onClick={onNavigateToSignup} className="btn-primary-clean">
                <span>Start Your Application</span>
                <span className="arrow">→</span>
              </button>
              <button onClick={onNavigateToLogin} className="btn-secondary-clean">
                Track Application Status
              </button>
            </div>
            <div className="trust-bar">
              <div className="trust-item-clean">
                <span className="trust-icon-clean">✓</span>
                <span>Government Verified</span>
              </div>
              <div className="trust-item-clean">
                <span className="trust-icon-clean">🔒</span>
                <span>Secure & Encrypted</span>
              </div>
              <div className="trust-item-clean">
                <span className="trust-icon-clean">⚡</span>
                <span>3-5 Day Processing</span>
              </div>
            </div>
          </div>
          <div className="hero-visual-clean">
            <div className="floating-card-clean card-main">
              <div className="card-icon-large">📄</div>
              <div className="card-title">Application Status</div>
              <div className="status-bar">
                <div className="status-progress" style={{width: '75%'}}></div>
              </div>
              <div className="card-stats">
                <div className="stat-small">
                  <span className="stat-label">Processing</span>
                  <span className="stat-value">75%</span>
                </div>
                <div className="stat-small">
                  <span className="stat-label">Est. Time</span>
                  <span className="stat-value">2 days</span>
                </div>
              </div>
            </div>
            <div className="floating-card-clean card-top">
              <span className="mini-icon-clean">✓</span>
              <span className="mini-text-clean">Verified Documents</span>
            </div>
            <div className="floating-card-clean card-bottom">
              <span className="mini-icon-clean">👥</span>
              <span className="mini-text-clean">1,247 Applications</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner-clean">
        <div className="stats-container-clean">
          <div className="stat-box-clean">
            <div className="stat-number-clean">2,500+</div>
            <div className="stat-label-clean">Applications Processed</div>
          </div>
          <div className="stat-divider-clean"></div>
          <div className="stat-box-clean">
            <div className="stat-number-clean">95%</div>
            <div className="stat-label-clean">Approval Rate</div>
          </div>
          <div className="stat-divider-clean"></div>
          <div className="stat-box-clean">
            <div className="stat-number-clean">3-5 Days</div>
            <div className="stat-label-clean">Average Processing</div>
          </div>
          <div className="stat-divider-clean"></div>
          <div className="stat-box-clean">
            <div className="stat-number-clean">24/7</div>
            <div className="stat-label-clean">Online Support</div>
          </div>
        </div>
      </section>

      {/* Services Grid - Clean */}
      <section className="services-clean">
        <div className="section-container-clean">
          <div className="section-header-clean">
            <span className="section-tag">Our Services</span>
            <h2>Residency Application Types</h2>
            <p>We offer digital residency services for different categories of applicants</p>
          </div>

          <div className="services-grid-clean">
            <div className="service-card-clean available">
              <div className="service-header-clean">
                <div className="service-icon-clean">🇮🇶</div>
                <span className="service-status available">Available Now</span>
              </div>
              <h3>Iraqi Citizens</h3>
              <p>Residency permits for Iraqi citizens from other provinces relocating to Kurdistan Region</p>
              <ul className="service-list-clean">
                <li>✓ Online application</li>
                <li>✓ Fast processing</li>
                <li>✓ Digital tracking</li>
              </ul>
              <button onClick={onNavigateToSignup} className="service-btn-clean">
                Apply Now →
              </button>
            </div>

            <div className="service-card-clean">
              <div className="service-header-clean">
                <div className="service-icon-clean disabled">💼</div>
                <span className="service-status coming">Coming Soon</span>
              </div>
              <h3>Foreign Workers</h3>
              <p>Work permits and residency for international professionals and skilled workers</p>
              <ul className="service-list-clean disabled-list">
                <li>○ Work authorization</li>
                <li>○ Family sponsorship</li>
                <li>○ Renewal support</li>
              </ul>
              <button className="service-btn-clean disabled" disabled>
                Not Available
              </button>
            </div>

            <div className="service-card-clean">
              <div className="service-header-clean">
                <div className="service-icon-clean disabled">🎓</div>
                <span className="service-status coming">Coming Soon</span>
              </div>
              <h3>International Students</h3>
              <p>Student residency for those enrolled in accredited Kurdistan Region universities</p>
              <ul className="service-list-clean disabled-list">
                <li>○ Student visa</li>
                <li>○ Part-time work permit</li>
                <li>○ Extension options</li>
              </ul>
              <button className="service-btn-clean disabled" disabled>
                Not Available
              </button>
            </div>

            <div className="service-card-clean">
              <div className="service-header-clean">
                <div className="service-icon-clean disabled">💰</div>
                <span className="service-status coming">Coming Soon</span>
              </div>
              <h3>Business & Investors</h3>
              <p>Residency programs for entrepreneurs and business investors in Kurdistan Region</p>
              <ul className="service-list-clean disabled-list">
                <li>○ Investment residency</li>
                <li>○ Business setup support</li>
                <li>○ Fast-track option</li>
              </ul>
              <button className="service-btn-clean disabled" disabled>
                Not Available
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-clean">
        <div className="section-container-clean">
          <div className="section-header-clean">
            <span className="section-tag">Simple Process</span>
            <h2>How to Apply</h2>
            <p>Get your residency permit in four straightforward steps</p>
          </div>

          <div className="process-grid-clean">
            <div className="process-card-clean">
              <div className="process-number">01</div>
              <div className="process-icon-clean">👤</div>
              <h3>Create Account</h3>
              <p>Register with your email and create a secure password in under 2 minutes</p>
            </div>
            <div className="process-arrow-clean">→</div>
            <div className="process-card-clean">
              <div className="process-number">02</div>
              <div className="process-icon-clean">📝</div>
              <h3>Complete Form</h3>
              <p>Fill out the online application with your personal and residency details</p>
            </div>
            <div className="process-arrow-clean">→</div>
            <div className="process-card-clean">
              <div className="process-number">03</div>
              <div className="process-icon-clean">📤</div>
              <h3>Submit Documents</h3>
              <p>Upload required documents and pay processing fee securely online</p>
            </div>
            <div className="process-arrow-clean">→</div>
            <div className="process-card-clean">
              <div className="process-number">04</div>
              <div className="process-icon-clean">✅</div>
              <h3>Get Approved</h3>
              <p>Track status and receive your digital residency permit via email</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-clean">
        <div className="cta-container-clean">
          <h2>Ready to Begin Your Application?</h2>
          <p>Join thousands who have successfully obtained their residency permit through our digital platform</p>
          <div className="cta-buttons-clean">
            <button onClick={onNavigateToSignup} className="cta-btn-primary">
              Start Application
            </button>
            <button onClick={onNavigateToLogin} className="cta-btn-secondary">
              Login to Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-clean">
        <div className="footer-container-clean">
          <div className="footer-top-clean">
            <div className="footer-col-clean">
              <img src="https://gov.krd/media/1099/govkrdlogobig.svg" alt="KRG" className="footer-logo" />
              <p>Official digital platform for Kurdistan Regional Government residency applications.</p>
            </div>
            <div className="footer-col-clean">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col-clean">
              <h4>Services</h4>
              <a href="#iraqi">Iraqi Citizens</a>
              <a href="#track">Track Application</a>
              <a href="#help">Help Center</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col-clean">
              <h4>Contact</h4>
              <p>📍 Erbil, Kurdistan Region</p>
              <p>📞 +964 66 254 0892</p>
              <p>✉️ info@krg-residency.gov</p>
            </div>
          </div>
          <div className="footer-bottom-clean">
            <p>&copy; 2025 Kurdistan Regional Government. All Rights Reserved.</p>
            <p className="capstone-note">Developed by AUIS Capstone Team 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;