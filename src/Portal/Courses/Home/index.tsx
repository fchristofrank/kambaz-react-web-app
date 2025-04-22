// @ts-nocheck
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobMarketTrends from './Trends';

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

// Sample user profile for when logged in
const sampleUserProfile = {
  name: "Alex Johnson",
  title: "Senior Software Developer",
  connections: 412,
  viewedProfile: 38,
  impressions: 143
};

// Inline styles
const styles = {
  // Main container
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f3f2ef',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },
  
  // Header section
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    backgroundColor: 'white',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)'
  },
  
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0a66c2'
  },
  
  loginSignupButtons: {
    display: 'flex',
    gap: '12px'
  },
  
  loginButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#0a66c2',
    border: '1px solid #0a66c2',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },
  
  signupButton: {
    padding: '8px 16px',
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  },

  // Main content grid
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '3fr 7fr',
    gap: '24px'
  },

  fullWidthGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  
  // Profile card
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
    height: 'fit-content'
  },
  
  profileCardBanner: {
    height: '60px',
    backgroundColor: '#0a66c2',
    position: 'relative'
  },
  
  profileCardAvatar: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    border: '3px solid white',
    backgroundColor: '#f3f2ef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#0a66c2',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  
  profileCardBody: {
    padding: '48px 12px 12px',
    textAlign: 'center'
  },
  
  profileName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
    marginBottom: '4px'
  },
  
  profileTitle: {
    fontSize: '14px',
    color: '#666',
    margin: '0',
    marginBottom: '16px'
  },
  
  profileStats: {
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    padding: '12px 0',
    margin: '0 -12px',
    marginBottom: '12px'
  },
  
  profileStatItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 12px',
    fontSize: '12px',
    color: '#666'
  },
  
  profileStatValue: {
    color: '#0a66c2',
    fontWeight: 'bold'
  },
  
  viewProfileButton: {
    width: '100%',
    padding: '8px',
    backgroundColor: 'transparent',
    color: '#0a66c2',
    border: '1px solid #0a66c2',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },

  // Analytics section
  analyticsSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)'
  },
  
  analyticsSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333'
  },

  // Job section
  jobSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)'
  },

  jobSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  viewAllJobsLink: {
    fontSize: '14px',
    color: '#0a66c2',
    textDecoration: 'none',
    fontWeight: 'normal'
  },

  // Job list and cards
  jobList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px'
  },

  jobCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },

  jobCardInteractive: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    }
  },

  jobCardHeader: {
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },

  companyLogo: {
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    backgroundColor: '#0a66c2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px'
  },

  jobCardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
    marginBottom: '4px',
    color: '#333'
  },

  jobCardCompany: {
    fontSize: '14px',
    margin: '0',
    marginBottom: '4px',
    color: '#666'
  },

  jobCardLocation: {
    fontSize: '12px',
    margin: '0',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  jobCardBody: {
    padding: '0 16px 16px',
  },

  jobCardDescription: {
    fontSize: '14px',
    color: '#333',
    margin: '0',
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  jobSkillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px'
  },

  jobSkill: {
    fontSize: '12px',
    color: '#0a66c2',
    backgroundColor: '#e2f0fe',
    padding: '4px 8px',
    borderRadius: '16px'
  },

  jobCardFooter: {
    padding: '12px 16px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  jobSalary: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0a66c2'
  },

  jobType: {
    fontSize: '12px',
    color: '#666',
    padding: '4px 8px',
    backgroundColor: '#f3f2ef',
    borderRadius: '12px'
  },

  applyButton: {
    width: '100%',
    padding: '8px 0',
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '12px'
  },

  // Expanded job view
  expandedJobContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  },

  expandedJobCard: {
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    position: 'relative'
  },

  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#f3f2ef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px'
  },

  expandedJobTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333'
  },

  expandedJobCompany: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#333'
  },

  expandedJobLocation: {
    fontSize: '16px',
    marginBottom: '16px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  expandedJobSection: {
    marginBottom: '24px'
  },

  expandedJobSectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333'
  },

  expandedJobSectionContent: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333'
  },

  expandedJobApplyButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0a66c2',
    color: 'white',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '24px'
  },

  // Welcome banner for non-logged in users
  welcomeBanner: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333'
  },
  
  welcomeSubtitle: {
    fontSize: '16px',
    marginBottom: '24px',
    color: '#666',
    maxWidth: '600px'
  },
  
  welcomeButtons: {
    display: 'flex',
    gap: '16px'
  },
  
  // Loading and error states
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '200px'
  },
  
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f2ef',
    borderRadius: '50%',
    borderTop: '4px solid #0a66c2',
    animation: 'spin 1s linear infinite'
  },
  
  loadingText: {
    marginTop: '16px',
    color: '#666'
  },
  
  error: {
    backgroundColor: '#fde8e8',
    color: '#e53e3e',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px'
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  
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
    styleElement.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Use mock data instead of API call for now
  useEffect(() => {
    // Simulate API delay for realistic testing
    const timer = setTimeout(() => {
      setJobs(mockJobListings);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to expand job details
  const expandJob = (jobId) => {
    setExpandedJobId(jobId);
  };

  // Function to close expanded job view
  const closeExpandedJob = () => {
    setExpandedJobId(null);
  };

  // Function to handle login navigation
  const handleLogin = () => {
    navigate('/Portal/Account/Signin');
  };

  // Function to handle signup navigation
  const handleSignup = () => {
    navigate('/Portal/Account/Signup');
  };

  // Function to handle profile navigation
  const handleViewProfile = () => {
    navigate('/portal/profile');
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}></div>
          <p style={styles.loadingText}>Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <p>There was an error loading the content. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Find expanded job details
  const expandedJob = jobs.find(job => job.id === expandedJobId);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>CareerConnect</h1>
        {!isLoggedIn && (
          <div style={styles.loginSignupButtons}>
            <button 
              style={styles.loginButton}
              onClick={handleLogin}
              onMouseOver={(e) => e.target.style.backgroundColor = '#f3f2ef'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Sign In
            </button>
            <button 
              style={styles.signupButton}
              onClick={handleSignup}
              onMouseOver={(e) => e.target.style.backgroundColor = '#084b8e'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0a66c2'}
            >
              Join Now
            </button>
          </div>
        )}
      </div>

      {/* Main Content Section */}
      {isLoggedIn ? (
        // Logged in experience
        <div>
          {/* Analytics Section */}
          <div style={styles.analyticsSection}>
            <h2 style={styles.analyticsSectionTitle}>Job Market Trends</h2>
            <JobMarketTrends />
          </div>
          
          {/* Jobs Section */}
          <div style={styles.jobSection}>
            <div style={styles.jobSectionTitle}>
              <span>Recommended Jobs</span>
              <a href="#" style={styles.viewAllJobsLink}>View all</a>
            </div>
            
            <div style={styles.jobList}>
              {jobs.map(job => (
                <div 
                  key={job.id} 
                  style={{...styles.jobCard, ...styles.jobCardInteractive}}
                  onClick={() => expandJob(job.id)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.jobCardHeader}>
                    <div style={styles.companyLogo}>
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h3 style={styles.jobCardTitle}>{job.title}</h3>
                      <p style={styles.jobCardCompany}>{job.company}</p>
                      <p style={styles.jobCardLocation}>
                        <span>📍</span> {job.location}
                      </p>
                    </div>
                  </div>
                  <div style={styles.jobCardBody}>
                    <p style={styles.jobCardDescription}>{job.description}</p>
                    <div style={styles.jobSkillsList}>
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} style={styles.jobSkill}>{skill}</span>
                      ))}
                      {job.skills.length > 3 && (
                        <span style={styles.jobSkill}>+{job.skills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <div style={styles.jobCardFooter}>
                    <span style={styles.jobSalary}>{job.salary}</span>
                    <span style={styles.jobType}>{job.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Non-logged in experience
        <div style={styles.fullWidthGrid}>
          {/* Welcome Banner */}
          <div style={styles.welcomeBanner}>
            <h2 style={styles.welcomeTitle}>Welcome to CareerConnect</h2>
            <p style={styles.welcomeSubtitle}>
              Your professional community. Find jobs, connect with industry experts, and build your career.
            </p>
            <div style={styles.welcomeButtons}>
              <button 
                style={styles.loginButton}
                onClick={handleLogin}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f3f2ef'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Sign In
              </button>
              <button 
                style={styles.signupButton}
                onClick={handleSignup}
                onMouseOver={(e) => e.target.style.backgroundColor = '#084b8e'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#0a66c2'}
              >
                Join Now
              </button>
            </div>
          </div>
          
          {/* Featured Jobs Section */}
          <div style={styles.jobSection}>
            <h2 style={styles.jobSectionTitle}>Featured Jobs</h2>
            <div style={styles.jobList}>
              {jobs.map(job => (
                <div key={job.id} style={styles.jobCard}>
                  <div style={styles.jobCardHeader}>
                    <div style={styles.companyLogo}>
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h3 style={styles.jobCardTitle}>{job.title}</h3>
                      <p style={styles.jobCardCompany}>{job.company}</p>
                      <p style={styles.jobCardLocation}>
                        <span>📍</span> {job.location}
                      </p>
                    </div>
                  </div>
                  <div style={styles.jobCardBody}>
                    <p style={styles.jobCardDescription}>{job.description}</p>
                    <div style={styles.jobSkillsList}>
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} style={styles.jobSkill}>{skill}</span>
                      ))}
                      {job.skills.length > 3 && (
                        <span style={styles.jobSkill}>+{job.skills.length - 3} more</span>
                      )}
                    </div>
                    <button 
                      style={styles.applyButton}
                      onClick={handleLogin}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#084b8e'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#0a66c2'}
                    >
                      Sign in to apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expanded Job View Modal */}
      {expandedJobId && expandedJob && (
        <div style={styles.expandedJobContainer} onClick={closeExpandedJob}>
          <div style={styles.expandedJobCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeExpandedJob}>✕</button>
            
            <h2 style={styles.expandedJobTitle}>{expandedJob.title}</h2>
            <h3 style={styles.expandedJobCompany}>{expandedJob.company}</h3>
            <p style={styles.expandedJobLocation}>
              <span>📍</span> {expandedJob.location} • {expandedJob.type}
            </p>
            
            <div style={styles.expandedJobSection}>
              <h4 style={styles.expandedJobSectionTitle}>Job Description</h4>
              <p style={styles.expandedJobSectionContent}>{expandedJob.description}</p>
            </div>
            
            <div style={styles.expandedJobSection}>
              <h4 style={styles.expandedJobSectionTitle}>Ideal Candidate</h4>
              <p style={styles.expandedJobSectionContent}>{expandedJob.idealCandidate}</p>
            </div>
            
            <div style={styles.expandedJobSection}>
              <h4 style={styles.expandedJobSectionTitle}>Skills</h4>
              <div style={styles.jobSkillsList}>
                {expandedJob.skills.map((skill, index) => (
                  <span key={index} style={styles.jobSkill}>{skill}</span>
                ))}
              </div>
            </div>
            
            <div style={styles.expandedJobSection}>
              <h4 style={styles.expandedJobSectionTitle}>Compensation</h4>
              <p style={styles.expandedJobSectionContent}>{expandedJob.salary}</p>
            </div>
            
            <button 
              style={styles.expandedJobApplyButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#084b8e'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0a66c2'}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;