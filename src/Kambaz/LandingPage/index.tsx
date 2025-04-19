import React from 'react';
import { Search, Users, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingHome = () => {
  const navigate = useNavigate();

  // Main Styles
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1e3a8a, #000000)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    logo: {
      color: '#60a5fa'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    navLinks: {
      display: 'flex',
      gap: '1rem'
    },
    navButton: {
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      background: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    navButtonHover: {
      backgroundColor: '#1e40af'
    },
    heroSection: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4rem 1.5rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    heroContent: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    heroTitleHighlight: {
      color: '#60a5fa'
    },
    heroText: {
      fontSize: '1.25rem',
      color: '#bfdbfe'
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      paddingTop: '1.5rem'
    },
    primaryButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    primaryButtonHover: {
      backgroundColor: '#2563eb'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      border: '1px solid #3b82f6',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    secondaryButtonHover: {
      backgroundColor: '#1e40af'
    },
    heroImage: {
      width: '50%',
      display: 'flex',
      justifyContent: 'center'
    },
    image: {
      borderRadius: '0.5rem',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    featuresSection: {
      backgroundColor: 'rgba(30, 58, 138, 0.5)',
      padding: '4rem 1.5rem'
    },
    sectionTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3rem'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featureCard: {
      backgroundColor: 'rgba(30, 64, 175, 0.4)',
      padding: '1.5rem',
      borderRadius: '0.5rem'
    },
    featureIcon: {
      color: '#60a5fa',
      marginBottom: '1rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    featureText: {
      color: '#bfdbfe'
    },
    statsSection: {
      padding: '4rem 1.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#60a5fa'
    },
    statLabel: {
      fontSize: '1.125rem',
      color: '#bfdbfe'
    },
    ctaSection: {
      backgroundColor: '#1e40af',
      padding: '4rem 1.5rem',
      textAlign: 'center'
    },
    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    ctaTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    ctaText: {
      fontSize: '1.25rem',
      color: '#bfdbfe',
      marginBottom: '2rem'
    },
    ctaButtons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '1rem'
    },
    footer: {
      backgroundColor: '#0f2557',
      padding: '3rem 1.5rem'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    footerTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    footerText: {
      color: '#93c5fd'
    },
    footerSubtitle: {
      fontWeight: '600',
      marginBottom: '1rem'
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    footerListItem: {
      color: '#93c5fd'
    },
    footerBottom: {
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '3rem',
      paddingTop: '2rem',
      borderTop: '1px solid #1e40af',
      textAlign: 'center',
      color: '#60a5fa'
    },
    // Note: Move responsive styles to a CSS file or use a CSS-in-JS library for better handling.
  };

  // Function to handle button hover state
  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>, hoverStyle: React.CSSProperties) => {
    Object.keys(hoverStyle).forEach(key => {
      (e.target as HTMLElement).style[key as any] = hoverStyle[key as keyof React.CSSProperties] as string;
    });
  };

interface MouseOutEvent extends React.MouseEvent<HTMLButtonElement> {}
interface OriginalStyle {
    [key: string]: string;
}

const handleMouseOut = (e: MouseOutEvent, originalStyle: OriginalStyle) => {
    Object.keys(originalStyle).forEach(key => {
        (e.target as HTMLElement).style[key as any] = originalStyle[key];
    });
};

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <div style={styles.logoContainer}>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Connect with your <span style={styles.heroTitleHighlight}>dream career</span> today
          </h1>
          <p style={styles.heroText}>
            Thousands of opportunities waiting for your talent. Your next career move is just a click away.
          </p>
          <div style={styles.buttonContainer}>
            <button 
              style={styles.primaryButton}
              onMouseOver={(e) => handleMouseOver(e, styles.primaryButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, { backgroundColor: '#3b82f6' })}
              onClick={() => window.location.href = '#/Kambaz/Account/Signup'}
            >
              Sign Up <ArrowRight style={{ marginLeft: '0.5rem' }} size={18} />
            </button>
            <button 
              style={styles.secondaryButton}
              onMouseOver={(e) => handleMouseOver(e, styles.secondaryButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, { backgroundColor: 'transparent' })}
              onClick={() => window.location.href = '#/Kambaz/Account/Signin'}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div>
          <h2 style={styles.sectionTitle}>Why Choose CareerConnect?</h2>
          
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <Search size={48} style={styles.featureIcon} />
              <h3 style={styles.featureTitle}>Smart Job Matching</h3>
              <p style={styles.featureText}>Our AI algorithm matches your skills and preferences to the perfect opportunities.</p>
            </div>
            
            <div style={styles.featureCard}>
              <Users size={48} style={styles.featureIcon} />
              <h3 style={styles.featureTitle}>Direct Employer Access</h3>
              <p style={styles.featureText}>Connect directly with hiring managers and recruiters from top companies.</p>
            </div>
            
            <div style={styles.featureCard}>
              <Star size={48} style={styles.featureIcon} />
              <h3 style={styles.featureTitle}>Career Resources</h3>
              <p style={styles.featureText}>Access resume builders, interview preparation guides, and salary insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={styles.statsSection}>
        <div>
          <h2 style={styles.sectionTitle}>Trusted by Job Seekers & Employers</h2>
          
          <div style={styles.statsGrid}>
            <div>
              <p style={styles.statNumber}>10K+</p>
              <p style={styles.statLabel}>Daily Job Postings</p>
            </div>
            
            <div>
              <p style={styles.statNumber}>5M+</p>
              <p style={styles.statLabel}>Active Users</p>
            </div>
            
            <div>
              <p style={styles.statNumber}>25K+</p>
              <p style={styles.statLabel}>Partner Companies</p>
            </div>
            
            <div>
              <p style={styles.statNumber}>85%</p>
              <p style={styles.statLabel}>Placement Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to transform your career journey?</h2>
          <p style={styles.ctaText}>Join thousands of professionals who found their perfect career match.</p>
          <div style={styles.ctaButtons}>
            <button 
              style={styles.primaryButton}
              onMouseOver={(e) => handleMouseOver(e, styles.primaryButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, { backgroundColor: '#3b82f6' })}
              onClick={() => navigate('/signup')}
            >
              Create an Account
            </button>
            <button 
              style={styles.secondaryButton}
              onMouseOver={(e) => handleMouseOver(e, styles.secondaryButtonHover)}
              onMouseOut={(e) => handleMouseOut(e, { backgroundColor: 'transparent' })}
              onClick={() => navigate('/jobs')}
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <h3 style={styles.footerTitle}>CareerConnect</h3>
            <p style={styles.footerText}>Your bridge to professional success.</p>
          </div>
          
          <div>
            <h4 style={styles.footerSubtitle}>For Job Seekers</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Browse Jobs</li>
              <li style={styles.footerListItem}>Career Resources</li>
              <li style={styles.footerListItem}>Resume Builder</li>
              <li style={styles.footerListItem}>Salary Insights</li>
            </ul>
          </div>
          
          <div>
            <h4 style={styles.footerSubtitle}>For Employers</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Post a Job</li>
              <li style={styles.footerListItem}>Talent Search</li>
              <li style={styles.footerListItem}>Recruiting Solutions</li>
              <li style={styles.footerListItem}>Pricing Plans</li>
            </ul>
          </div>
          
          <div>
            <h4 style={styles.footerSubtitle}>Company</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>About Us</li>
              <li style={styles.footerListItem}>Contact</li>
              <li style={styles.footerListItem}>Privacy Policy</li>
              <li style={styles.footerListItem}>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>&copy; 2025 CareerConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingHome;