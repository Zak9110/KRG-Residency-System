import React, { useState } from 'react';
import './Home.css';

function Home({ onNavigateToLogin, onNavigateToSignup }) {
  const [language, setLanguage] = useState('en');

  return (
    <div className="home-container-v2">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span className="announcement-icon">📢</span>
          <span>New: Online residency applications are now available for Iraqi citizens</span>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="top-nav">
        <div className="top-nav-content">
          <div className="contact-bar">
            <a href="tel:+9646625540892" className="contact-item">
              <span className="icon">📞</span>
              <span>+964 66 254 0892</span>
            </a>
            <a href="mailto:info@krg.gov" className="contact-item">
              <span className="icon">✉️</span>
              <span>info@krg-residency.gov</span>
            </a>
          </div>
          <div className="language-switcher">
            <button 
              className={`lang-option ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button 
              className={`lang-option ${language === 'ku' ? 'active' : ''}`}
              onClick={() => setLanguage('ku')}
            >
              کوردی
            </button>
            <button 
              className={`lang-option ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
            >
              عربي
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header-v2">
        <div className="header-wrapper">
          <div className="header-left">
            <div className="logo-container">
              <div className="flag-emblem">
                <div className="flag-stripe red"></div>
                <div className="flag-stripe white">
                  <div className="sun-emblem">
                    <div className="sun-center"></div>
                    {[...Array(21)].map((_, i) => (
                      <div 
                        key={i} 
                        className="sun-ray" 
                        style={{ transform: `rotate(${i * 17.14}deg)` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flag-stripe green"></div>
              </div>
            </div>
            <div className="site-branding">
              <h1 className="site-name">Kurdistan Regional Government</h1>
              <p className="site-tagline">Digital Residency Management System</p>
            </div>
          </div>
          <nav className="header-nav">
            <a href="#home" className="nav-item">Home</a>
            <a href="#about" className="nav-item">About</a>
            <a href="#services" className="nav-item">Services</a>
            <a href="#contact" className="nav-item">Contact</a>
            <button onClick={onNavigateToLogin} className="btn-login">
              Login
            </button>
            <button onClick={onNavigateToSignup} className="btn-apply">
              Apply Now
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Modern Design */}
      <section className="hero-modern">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-container">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">✓</span>
              <span>Trusted by 1000+ Applicants</span>
            </div>
            <h1 className="hero-title">
              Digital Residency<br />
              <span className="title-highlight">Made Simple</span>
            </h1>
            <p className="hero-description">
              Apply for your Kurdistan Region residency permit online. 
              Fast, secure, and transparent process with real-time tracking.
            </p>
            <div className="hero-cta">
              <button onClick={onNavigateToSignup} className="btn-hero-primary">
                <span>Start Application</span>
                <span className="btn-arrow">→</span>
              </button>
              <button onClick={onNavigateToLogin} className="btn-hero-secondary">
                <span>Track Status</span>
              </button>
            </div>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>3-5 Day Processing</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure & Encrypted</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span>24/7 Online Access</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card main-card">
              <div className="card-header">
                <div className="status-indicator approved"></div>
                <span>Application Status</span>
              </div>
              <div className="card-body">
                <div className="progress-ring">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8" 
                            strokeDasharray="282.7" strokeDashoffset="70.675" 
                            transform="rotate(-90 50 50)"/>
                  </svg>
                  <div className="progress-text">
                    <span className="progress-number">75%</span>
                    <span className="progress-label">Complete</span>
                  </div>
                </div>
                <div className="card-info">
                  <div className="info-row">
                    <span className="info-label">Application ID:</span>
                    <span className="info-value">#KRG-2024-1234</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span className="info-value status-approved">Under Review</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="visual-card floating-card-1">
              <div className="mini-card">
                <span className="mini-icon">✓</span>
                <span className="mini-text">Documents Verified</span>
              </div>
            </div>
            <div className="visual-card floating-card-2">
              <div className="mini-card">
                <span className="mini-icon">👤</span>
                <span className="mini-text">1,247 Active Applications</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">2,500+</div>
            <div className="stat-label">Applications Processed</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Approval Rate</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">3-5 Days</div>
            <div className="stat-label">Average Processing</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Online Support</div>
          </div>
        </div>
      </div>

      {/* Services Section - Modern Cards */}
      <section className="services-modern">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-subtitle">Our Services</span>
            <h2 className="section-title">Who Can Apply?</h2>
            <p className="section-description">
              We offer residency services for different categories of applicants
            </p>
          </div>

          <div className="services-grid-modern">
            <div className="service-card-modern active">
              <div className="service-card-header">
                <div className="service-icon-wrapper">
                  <span className="service-icon-large">🇮🇶</span>
                </div>
                <div className="service-badge available">Available</div>
              </div>
              <h3 className="service-title">Iraqi Citizens</h3>
              <p className="service-desc">
                Residency permits for Iraqi citizens from other provinces moving to Kurdistan Region
              </p>
              <ul className="service-features">
                <li><span className="check-icon">✓</span> Online application</li>
                <li><span className="check-icon">✓</span> Fast processing</li>
                <li><span className="check-icon">✓</span> Digital tracking</li>
              </ul>
              <button onClick={onNavigateToSignup} className="service-btn">
                Apply Now →
              </button>
            </div>

            <div className="service-card-modern">
              <div className="service-card-header">
                <div className="service-icon-wrapper disabled">
                  <span className="service-icon-large">💼</span>
                </div>
                <div className="service-badge coming">Coming Soon</div>
              </div>
              <h3 className="service-title">Foreign Workers</h3>
              <p className="service-desc">
                Work permits and residency for international professionals and employees
              </p>
              <ul className="service-features disabled-features">
                <li><span className="check-icon">○</span> Work authorization</li>
                <li><span className="check-icon">○</span> Family sponsorship</li>
                <li><span className="check-icon">○</span> Renewal support</li>
              </ul>
              <button className="service-btn disabled" disabled>
                Not Available Yet
              </button>
            </div>

            <div className="service-card-modern">
              <div className="service-card-header">
                <div className="service-icon-wrapper disabled">
                  <span className="service-icon-large">🎓</span>
                </div>
                <div className="service-badge coming">Coming Soon</div>
              </div>
              <h3 className="service-title">International Students</h3>
              <p className="service-desc">
                Student residency for those enrolled in Kurdistan Region universities
              </p>
              <ul className="service-features disabled-features">
                <li><span className="check-icon">○</span> Student visa</li>
                <li><span className="check-icon">○</span> Part-time work permit</li>
                <li><span className="check-icon">○</span> Extension options</li>
              </ul>
              <button className="service-btn disabled" disabled>
                Not Available Yet
              </button>
            </div>

            <div className="service-card-modern">
              <div className="service-card-header">
                <div className="service-icon-wrapper disabled">
                  <span className="service-icon-large">💰</span>
                </div>
                <div className="service-badge coming">Coming Soon</div>
              </div>
              <h3 className="service-title">Business & Investors</h3>
              <p className="service-desc">
                Residency programs for entrepreneurs and business investors
              </p>
              <ul className="service-features disabled-features">
                <li><span className="check-icon">○</span> Investment residency</li>
                <li><span className="check-icon">○</span> Business setup support</li>
                <li><span className="check-icon">○</span> Fast-track option</li>
              </ul>
              <button className="service-btn disabled" disabled>
                Not Available Yet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process-section-modern">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-subtitle">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get your residency permit in 4 easy steps
            </p>
          </div>

          <div className="process-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <div className="timeline-icon">👤</div>
                <h3>Create Account</h3>
                <p>Sign up with your email address and create a secure password. Takes less than 2 minutes.</p>
              </div>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <div className="timeline-icon">📝</div>
                <h3>Fill Application</h3>
                <p>Complete the online form with your personal information and residency details.</p>
              </div>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <div className="timeline-icon">📤</div>
                <h3>Submit & Pay</h3>
                <p>Upload required documents and pay the processing fee securely online.</p>
              </div>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <div className="timeline-icon">✅</div>
                <h3>Get Approved</h3>
                <p>Track your application status and receive your digital residency permit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-container">
          <div className="benefits-grid">
            <div className="benefits-content">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title-left">Benefits of Digital Application</h2>
              <p className="benefits-description">
                Our digital platform transforms the traditional residency application process, 
                making it faster, more transparent, and accessible to everyone.
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <div>
                    <h4>Fast Processing</h4>
                    <p>Get your application reviewed in 3-5 business days instead of weeks</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">🔒</div>
                  <div>
                    <h4>Secure & Safe</h4>
                    <p>Military-grade encryption protects all your personal information</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">👁️</div>
                  <div>
                    <h4>Full Transparency</h4>
                    <p>Track every step of your application in real-time</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <div>
                    <h4>Save Money</h4>
                    <p>No travel costs or time off work - apply from anywhere</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">📱</div>
                  <div>
                    <h4>24/7 Access</h4>
                    <p>Apply anytime, anywhere - no office hours restrictions</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">🌐</div>
                  <div>
                    <h4>Multi-Language</h4>
                    <p>Available in English, Kurdish, and Arabic</p>
                  </div>
                </div>
              </div>

              <button onClick={onNavigateToSignup} className="benefits-cta">
                Start Your Application →
              </button>
            </div>

            <div className="benefits-visual">
              <div className="visual-grid">
                <div className="visual-stat-card card-1">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <div className="stat-value">2,547</div>
                    <div className="stat-title">Applications</div>
                  </div>
                </div>

                <div className="visual-stat-card card-2">
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-info">
                    <div className="stat-value">3-5</div>
                    <div className="stat-title">Days Average</div>
                  </div>
                </div>

                <div className="visual-stat-card card-3">
                  <div className="stat-icon">✓</div>
                  <div className="stat-info">
                    <div className="stat-value">95%</div>
                    <div className="stat-title">Approval Rate</div>
                  </div>
                </div>

                <div className="visual-stat-card card-4">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <div className="stat-value">4.8/5</div>
                    <div className="stat-title">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-container">
          <div className="section-header-center">
            <span className="section-subtitle">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>How long does the process take?</h4>
              <p>Most applications are processed within 3-5 business days after submission. You can track your application status in real-time through your dashboard.</p>
            </div>

            <div className="faq-item">
              <h4>What documents do I need?</h4>
              <p>You'll need a valid ID or passport, proof of address, and recent photographs. Specific requirements may vary based on your application type.</p>
            </div>

            <div className="faq-item">
              <h4>Is my data secure?</h4>
              <p>Yes, we use bank-level encryption (256-bit SSL) to protect all your personal information and documents. Your data is stored securely on government servers.</p>
            </div>

            <div className="faq-item">
              <h4>Can I edit my application after submission?</h4>
              <p>You cannot edit after submission, but you can contact support if you need to update information. We recommend reviewing carefully before submitting.</p>
            </div>

            <div className="faq-item">
              <h4>What payment methods are accepted?</h4>
              <p>We accept all major credit cards, debit cards, and local bank transfers through our secure payment gateway.</p>
            </div>

            <div className="faq-item">
              <h4>What if my application is rejected?</h4>
              <p>You'll receive detailed feedback on why it was rejected and can reapply after addressing the issues. No additional fees for resubmission within 30 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of people who have successfully obtained their residency permit online</p>
          <div className="cta-buttons">
            <button onClick={onNavigateToSignup} className="cta-primary">
              Apply for Residency
            </button>
            <button onClick={onNavigateToLogin} className="cta-secondary">
              Login to Existing Account
            </button>
          </div>
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>Secure & Encrypted</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span>Fast Processing</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>Government Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Footer */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-grid">
            <div className="footer-column brand-column">
              <div className="footer-logo">
                <div className="footer-flag">
                  <div className="flag-stripe red"></div>
                  <div className="flag-stripe white"></div>
                  <div className="flag-stripe green"></div>
                </div>
                <div>
                  <h3>KRG</h3>
                  <p>Digital Residency</p>
                </div>
              </div>
              <p className="footer-description">
                Official digital platform for Kurdistan Regional Government residency applications. 
                Providing efficient, transparent, and accessible services.
              </p>
              <div className="social-links">
                <a href="#facebook" className="social-link">f</a>
                <a href="#twitter" className="social-link">𝕏</a>
                <a href="#instagram" className="social-link">📷</a>
                <a href="#linkedin" className="social-link">in</a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#process">How It Works</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul className="footer-links">
                <li><a href="#iraqi">Iraqi Citizens</a></li>
                <li><a href="#workers">Foreign Workers</a></li>
                <li><a href="#students">Students</a></li>
                <li><a href="#investors">Investors</a></li>
                <li><a href="#track">Track Application</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul className="footer-links">
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Info</h4>
              <div className="contact-info-footer">
                <p>📍 Erbil, Kurdistan Region</p>
                <p>📞 +964 66 254 0892</p>
                <p>✉️ info@krg-residency.gov</p>
                <p>🕒 Sun-Thu: 8 AM - 4 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Kurdistan Regional Government. All Rights Reserved.</p>
            <div className="footer-meta">
              <a href="#privacy">Privacy</a>
              <span>•</span>
              <a href="#terms">Terms</a>
              <span>•</span>
              <a href="#sitemap">Sitemap</a>
            </div>
            <p className="capstone-credit">Developed by AUIS Capstone Team 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;