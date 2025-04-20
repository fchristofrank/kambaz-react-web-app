// @ts-nocheck
import React, { useState, useEffect } from 'react';
import JobMarketTrends from './Trends'

// Mock data to use until real API is implemented
const mockJobListings = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    description: "We're looking for an experienced React developer to join our team and help build innovative web applications. You'll work on challenging projects using the latest technologies.",
    idealCandidate: "You have 5+ years of experience with React and modern JavaScript. You're familiar with state management solutions, testing frameworks, and have experience with backend technologies. You're a team player who enjoys solving complex problems.",
    skills: ["React", "TypeScript", "Redux", "Node.js"],
    salary: "$120K - $160K"
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Minds",
    location: "New York, NY",
    type: "Contract",
    description: "Join our design team to create stunning user experiences for our clients. You should have a strong portfolio and experience with design systems.",
    idealCandidate: "You have 3+ years of experience in UX/UI design with a strong portfolio. You're proficient with design tools like Figma and Adobe XD. You understand user-centered design principles and can translate requirements into intuitive interfaces.",
    skills: ["Figma", "Adobe XD", "Design Systems", "Prototyping"],
    salary: "$90K - $120K"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudScale",
    location: "Remote",
    type: "Full-time",
    description: "Help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and CI/CD pipelines is essential for this position.",
    idealCandidate: "You have extensive experience with cloud platforms, containerization, and automation. You're familiar with infrastructure as code and security best practices. You're proactive and can troubleshoot complex systems issues.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    salary: "$110K - $150K"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataInsights",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    description: "Analyze complex data sets and build machine learning models to drive business decisions. Strong background in statistics and programming required.",
    idealCandidate: "You have an advanced degree in a quantitative field and experience applying machine learning to real-world problems. You're proficient with Python and data visualization tools. You can communicate complex findings to non-technical stakeholders.",
    skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization"],
    salary: "$115K - $155K"
  },
  {
    id: 5,
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Austin, TX",
    type: "Full-time",
    description: "Develop cutting-edge mobile applications for iOS and Android. Experience with React Native or Flutter is highly desired.",
    idealCandidate: "You have extensive experience building and shipping mobile applications. You understand mobile UI/UX best practices and can optimize performance. You're detail-oriented and keep up with the latest mobile development trends.",
    skills: ["React Native", "JavaScript", "iOS", "Android", "API Integration"],
    salary: "$100K - $140K"
  }
];

// Inline styles
const styles = {
  container: {
    width: '100%',
    margin: '0',
    padding: '0',
    backgroundColor: '#FFF8F1' // Match the background color from screenshot
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
    padding: '1rem'
  },
  carouselContainer: {
    position: 'relative',
    height: '100vh', // Full viewport height
    overflow: 'hidden',
    backgroundColor: '#f8f9fa',
    width: '100%',
    maxWidth: '100%', // Full width
    borderRadius: '0',
    boxShadow: 'none',
    paddingBottom: '3rem' // Add padding at the bottom for dots
  },
  expandedCarouselContainer: {
    height: '100vh', // Keep full height when expanded
  },
  cardContainer: {
    position: 'absolute',
    inset: '0',
    display: 'flex',
    alignItems: 'center'
  },
  card: {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: 'calc(100% - 3rem)', // Adjust height to account for dots
    padding: '1.5rem',
    transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
    display: 'flex',
    flexDirection: 'column'
  },
  cardActive: {
    transform: 'translateX(0)',
    opacity: 1,
    zIndex: 10
  },
  cardBefore: {
    transform: 'translateX(-100%)',
    opacity: 0,
    zIndex: 0
  },
  cardAfter: {
    transform: 'translateX(100%)',
    opacity: 0,
    zIndex: 0
  },
  cardContent: {
    backgroundColor: 'white',
    borderRadius: '0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
    padding: '2rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  jobTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#212529'
  },
  jobType: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '9999px',
    backgroundColor: '#e9f2ff',
    color: '#0d6efd'
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  logoContainer: {
    width: '3.5rem',
    height: '3.5rem',
    backgroundColor: '#dc3545', // Solid red color
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  logoInitial: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white'
  },
  companyDetails: {
    marginLeft: '0.75rem'
  },
  companyName: {
    fontWeight: '500',
    color: '#212529'
  },
  location: {
    color: '#6c757d'
  },
  description: {
    color: '#495057',
    marginBottom: '1rem',
    flexGrow: 1,
    overflow: 'hidden'
  },
  expandedSection: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '0.375rem',
    transition: 'all 0.3s ease-in-out'
  },
  expandedTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '0.5rem'
  },
  expandedContent: {
    color: '#495057',
    lineHeight: '1.5'
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    marginTop: '1.5rem'
  },
  skill: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    borderRadius: '0.25rem',
    display: 'inline-block'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  salary: {
    color: '#198754',
    fontWeight: 'bold'
  },
  learnMoreButton: {
    padding: '1rem',
    backgroundColor: '#0d6efd',
    color: 'white',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    borderRadius: '0',
    width: '100%',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '2rem'
  },
  closeButton: {
    padding: '1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
    borderRadius: '0',
    width: '100%',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginTop: '2rem'
  },
  dots: {
    position: 'absolute',
    bottom: '1.5rem',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 20 // Ensure dots are above cards
  },
  dot: {
    width: '1rem',
    height: '1rem',
    margin: '0 0.5rem',
    borderRadius: '9999px',
    backgroundColor: '#dee2e6',
    transition: 'background-color 0.15s ease-in-out',
    cursor: 'pointer',
    border: 'none'
  },
  activeDot: {
    backgroundColor: '#0d6efd'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '0.5rem'
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '2rem',
    height: '2rem',
    border: '4px solid #dee2e6',
    borderRadius: '50%',
    borderTopColor: '#0d6efd',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    marginTop: '0.5rem',
    color: '#6c757d'
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '16rem',
    backgroundColor: '#f8d7da',
    borderRadius: '0.5rem',
    padding: '1rem'
  },
  errorIcon: {
    color: '#dc3545',
    fontSize: '3rem',
    marginBottom: '0.5rem'
  },
  errorTitle: {
    marginTop: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: '500',
    color: '#842029'
  },
  errorMessage: {
    marginTop: '0.25rem',
    color: '#842029'
  },
  empty: {
    backgroundColor: '#fff3cd',
    padding: '1rem',
    borderRadius: '0.5rem'
  },
  emptyText: {
    color: '#856404',
    textAlign: 'center'
  }
};

// Keyframe animation for spinner
const spinnerKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Check if user is logged in
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log('User logged in:', isLoggedIn);

  // Add spinner animation to document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = spinnerKeyframes;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Use mock data instead of API call for now
  useEffect(() => {
    // Simulate API delay for realistic testing
    const timer = setTimeout(() => {
      setCourses(mockJobListings);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate through job cards (only when no card is expanded)
  useEffect(() => {
    if (courses.length === 0 || expandedCard !== null) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % courses.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [courses.length, expandedCard]);

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading job listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <div style={styles.errorIcon}>⚠️</div>
        <h3 style={styles.errorTitle}>Failed to load job listings</h3>
        <p style={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No job listings available at the moment.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Latest Job Opportunities</h1>
      
      <div style={{
        ...styles.carouselContainer,
        ...(expandedCard !== null ? styles.expandedCarouselContainer : {})
      }}>
        {/* Card container */}
        <div style={styles.cardContainer}>
          {courses.map((job, index) => {
        let cardStyle = { ...styles.card };

        if (index === activeIndex) {
          cardStyle = { ...cardStyle, ...styles.cardActive };
        } else if (index < activeIndex) {
          cardStyle = { ...cardStyle, ...styles.cardBefore };
        } else {
          cardStyle = { ...cardStyle, ...styles.cardAfter };
        }

        const isExpanded = expandedCard === job.id;

        return (
          <div key={job.id || index} style={cardStyle}>
            <div style={styles.cardContent}>
          <div style={styles.cardHeader}>
            <h2 style={styles.jobTitle}>{job.title}</h2>
            <span style={styles.jobType}>
              {job.type || 'Full-time'}
            </span>
          </div>

          <div style={styles.companyInfo}>
            <div style={styles.logoContainer}>
              <span style={styles.logoInitial}>
            {job.company ? job.company.charAt(0) : 'J'}
              </span>
            </div>
            <div style={styles.companyDetails}>
              <h3 style={styles.companyName}>{job.company || 'Company Name'}</h3>
              <p style={styles.location}>{job.location || 'Remote'}</p>
            </div>
          </div>

          <p style={styles.description}>
            {job.description || 'No description available for this position.'}
          </p>

          {isExpanded && (
            <div style={styles.expandedSection}>
              <h4 style={styles.expandedTitle}>Ideal Candidate</h4>
              <p style={styles.expandedContent}>
            {job.idealCandidate || 'Information about the ideal candidate will be available soon.'}
              </p>
            </div>
          )}

          <div style={styles.skillsContainer}>
            {(job.skills || ['JavaScript', 'React']).map((skill, i) => (
              <span key={i} style={styles.skill}>
            {skill}
              </span>
            ))}
          </div>

          <div style={styles.footer}>
            <p style={styles.salary}>
              {job.salary || '$70K - $100K'}
            </p>
          </div>

          {isLoggedIn && (
            isExpanded ? (
              <button
            style={styles.closeButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
            onClick={() => setExpandedCard(null)}
              >
            Close
              </button>
            ) : (
              <button
            style={styles.learnMoreButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0b5ed7'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0d6efd'}
            onClick={() => setExpandedCard(job.id)}
              >
            Learn More
              </button>
            )
          )}
            </div>
          </div>
        );
          })}
        </div>

        {/* Navigation dots (only show when not expanded) */}
        {expandedCard === null && (
          <div style={styles.dots}>
        {courses.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
          ...styles.dot,
          ...(index === activeIndex ? styles.activeDot : {})
            }}
            aria-label={`View job listing ${index + 1}`}
          />
        ))}
          </div>
        )}
      </div>

      {/* Additional section below the cards */}
      {isLoggedIn && (
        <div>
          <JobMarketTrends />
        </div>
      )}
    </div>
  );
};

export default Home;