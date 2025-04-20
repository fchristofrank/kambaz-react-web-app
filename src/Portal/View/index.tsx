import { Award, Briefcase, Clock, Link, Mail, MapPin, MessageSquare, User, Users } from 'lucide-react';
import { useState } from 'react';

const ProfessionalProfile = () => {
  // Tabs for different sections
  const [activeTab, setActiveTab] = useState('overview');
  
  
  // Sample user data
  //findUserById
  const userData = {
    "_id": "674910e555bec5e3517ee474",
    "username": "dark_knight",
    "password": "wayne123",
    "firstName": "Bruce",
    "lastName": "Wayneaedasad",
    "email": "bruce@wayne.com",
    "dob": "2024-12-07T00:00:00.000Z",
    "role": "STUDENT",
    "loginId": "001234562S",
    "section": "S101",
    "lastActivity": "2020-11-02T00:00:00.000Z",
    "totalActivity": "15:32:43",
    "skills": [
      "Java",
      "Object Oriented Design"
    ],
    "description": "Bruce Wayne has a great experience working as a software engineer graduating with MS CS from Northeastern University",
    "Experience": [
      [
        "software developer at JP Morgan",
        "May 2021 to June 2022"
      ],
      [
        "Senior Manager at Google",
        "August 2022 to March 2023"
      ],
      [
        "Manager at Fidelity Investments",
        "March 2023 to July 2024"
      ],
      [
        "CEO at Amazon",
        "Present"
      ]
    ]
  };

  // Sample connections data (would be fetched from API in real app)
  const sampleConnections = [
    { id: "1", name: "Clark Kent", username: "superman", role: "Senior Software Developer", company: "Daily Planet Tech" },
    { id: "2", name: "Diana Prince", username: "wonderwoman", role: "Engineering Manager", company: "Amazon" },
    { id: "3", name: "Barry Allen", username: "flash", role: "DevOps Engineer", company: "STAR Labs" }
  ];

  const samplePendingRequests = [
    { id: "4", name: "Alfred Pennyworth", username: "butler", role: "IT Director", company: "Wayne Enterprises" },
    { id: "5", name: "Jim Gordon", username: "commissioner", role: "Security Manager", company: "Gotham Security" }
  ];

  const sampleRecommendedJobs = [
    { id: "1", title: "Senior Software Engineer", company: "Microsoft", location: "Seattle, WA", postedDate: "2024-05-15", match: 95 },
    { id: "2", title: "Engineering Manager", company: "Netflix", location: "Los Gatos, CA", postedDate: "2024-05-10", match: 87 },
    { id: "3", title: "Tech Lead", company: "Apple", location: "Cupertino, CA", postedDate: "2024-05-01", match: 82 }
  ];

  // Format date to readable format

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        gap: '24px',
        padding: '24px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '12px',
        marginBottom: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        {/* Avatar */}
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '60px', 
          backgroundColor: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '48px',
          fontWeight: 'bold'
        }}>
          {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
        </div>
        
        {/* User Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
              {userData.firstName} {userData.lastName}
            </h1>
            <div>
              <button style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Users size={16} />
                Connect
              </button>
              <button style={{
                backgroundColor: 'white',
                color: '#2563eb',
                border: '1px solid #2563eb',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Mail size={16} />
                Message
              </button>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '18px', 
            fontWeight: '500',
            color: '#4b5563', 
            marginTop: '8px' 
          }}>
            CEO at Amazon
          </div>
          
          <div style={{ 
            display: 'flex',
            gap: '16px',
            marginTop: '8px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <MapPin size={14} />
              Seattle, Washington
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <Link size={14} />
              <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>linkedin.com/in/brucewayne</a>
            </div>
          </div>
          
          <p style={{ fontSize: '16px', marginTop: '16px', color: '#374151' }}>
            {userData.description}
          </p>
          
          <div style={{ display: 'flex', marginTop: '16px', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={16} color="#6b7280" />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                <strong>{sampleConnections.length}</strong> Connections
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={16} color="#6b7280" />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Active: <strong>{userData.totalActivity}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        {['Overview', 'Experience', 'Connections', 'Job Recommendations'].map(tab => (
          <button 
            key={tab}
            style={{
              padding: '12px 16px',
              backgroundColor: activeTab === tab.toLowerCase() ? '#f3f4f6' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.toLowerCase() ? '2px solid #2563eb' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === tab.toLowerCase() ? 'bold' : 'normal',
              color: activeTab === tab.toLowerCase() ? '#2563eb' : '#4b5563'
            }}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Main Content Area */}
      <div style={{ minHeight: '400px' }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Personal Info */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} /> Professional Summary
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Current Role</div>
                  <div style={{ fontWeight: '500' }}>CEO at Amazon</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Experience</div>
                  <div style={{ fontWeight: '500' }}>3+ years</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Education</div>
                  <div style={{ fontWeight: '500' }}>MS CS, Northeastern University</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Email</div>
                  <div>{userData.email}</div>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} /> Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {userData.skills.concat([
                  'Leadership',
                  'Project Management',
                  'Cloud Computing',
                  'System Design',
                  'Agile Methodologies'
                ]).map((skill, index) => (
                  <span key={index} style={{
                    backgroundColor: '#e0f2fe',
                    color: '#0369a1',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
              <button style={{
                marginTop: '16px',
                backgroundColor: 'transparent',
                color: '#2563eb',
                border: '1px solid #2563eb',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Award size={14} />
                Endorse Skills
              </button>
            </div>
            
            {/* Job Recommendations Preview */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              gridColumn: 'span 2'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={20} /> Recommended Jobs
                </h2>
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    color: '#2563eb',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onClick={() => setActiveTab('job recommendations')}
                >
                  View All
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {sampleRecommendedJobs.slice(0, 3).map(job => (
                  <div key={job.id} style={{ 
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}>
                      <div style={{ 
                        backgroundColor: '#dbeafe', 
                        color: '#1e40af',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {job.match}% Match
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold', 
                      margin: '12px 0 4px 0' 
                    }}>
                      <a href={`/jobs/${job.id}`} style={{ 
                        color: '#111827', 
                        textDecoration: 'none' 
                      }}>
                        {job.title}
                      </a>
                    </h3>
                    <div style={{ fontSize: '14px', color: '#4b5563' }}>
                      {job.company}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px'
                    }}>
                      <MapPin size={14} />
                      {job.location}
                    </div>
                    
                    <div style={{ marginTop: '12px' }}>
                      <button style={{
                        width: '100%',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        padding: '8px 0',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} /> Professional Experience
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {userData.Experience.map((exp, index) => (
                <div key={index} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '8px', 
                    backgroundColor: '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Briefcase size={24} color="#2563eb" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{exp[0]}</div>
                    <div style={{ fontSize: '15px', color: '#4b5563', marginTop: '4px' }}>{exp[1]}</div>
                    {index === 0 && (
                      <div style={{ 
                        fontSize: '14px', 
                        backgroundColor: '#dcfce7', 
                        color: '#166534',
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        marginTop: '8px'
                      }}>
                        Current
                      </div>
                    )}
                    
                    <div style={{ marginTop: '12px', fontSize: '15px', color: '#4b5563' }}>
                      {index === 0 && "Leading global e-commerce and cloud computing initiatives, focusing on strategic growth and innovation."}
                      {index === 1 && "Managed a team of 20 engineers responsible for backend infrastructure, achieving 99.9% uptime and 30% reduction in operational costs."}
                      {index === 2 && "Led the development of financial analysis tools using Java and modern cloud architecture."}
                      {index === 3 && "Developed and maintained core banking applications serving over 2 million customers."}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      {["Leadership", "Strategy", "Team Management"].map((skill, i) => index === 0 && (
                        <span key={i} style={{
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {skill}
                        </span>
                      ))}
                      {["Cloud Infrastructure", "Java", "DevOps"].map((skill, i) => index === 1 && (
                        <span key={i} style={{
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {skill}
                        </span>
                      ))}
                      {["Financial Systems", "Agile", "Project Management"].map((skill, i) => index === 2 && (
                        <span key={i} style={{
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {skill}
                        </span>
                      ))}
                      {["Java", "Banking", "API Development"].map((skill, i) => index === 3 && (
                        <span key={i} style={{
                          backgroundColor: '#f3f4f6',
                          color: '#4b5563',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button style={{
                backgroundColor: 'white',
                color: '#2563eb',
                border: '1px solid #2563eb',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Add Experience
              </button>
            </div>
          </div>
        )}
        
        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            {/* Current Connections */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} /> Connections ({sampleConnections.length})
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sampleConnections.map(connection => (
                  <div key={connection.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                  }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '24px', 
                      backgroundColor: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      marginRight: '12px'
                    }}>
                      {connection.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>
                        <a href={`/profile/${connection.username}`} style={{ 
                          color: '#111827', 
                          textDecoration: 'none',
                        }}>
                          {connection.name}
                        </a>
                      </div>
                      <div style={{ fontSize: '14px', color: '#4b5563' }}>
                        {connection.role}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        {connection.company}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        backgroundColor: 'transparent',
                        color: '#2563eb',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}>
                        <MessageSquare size={18} />
                      </button>
                      <button style={{
                        backgroundColor: 'transparent',
                        color: '#6b7280',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}>
                        <User size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Connection Requests */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} /> Connection Requests ({samplePendingRequests.length})
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {samplePendingRequests.map(request => (
                  <div key={request.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                  }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '24px', 
                      backgroundColor: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      marginRight: '12px'
                    }}>
                      {request.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500' }}>
                        <a href={`/profile/${request.username}`} style={{ 
                          color: '#111827', 
                          textDecoration: 'none',
                        }}>
                          {request.name}
                        </a>
                      </div>
                      <div style={{ fontSize: '14px', color: '#4b5563' }}>
                        {request.role}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        {request.company}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Accept
                      </button>
                      <button style={{
                        backgroundColor: 'white',
                        color: '#6b7280',
                        border: '1px solid #d1d5db',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Job Recommendations Tab */}
        {activeTab === 'job recommendations' && (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={20} /> Recommended Jobs
              </h2>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    style={{
                      padding: '8px 12px',
                      paddingLeft: '32px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                  <div style={{ 
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                
                <select style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}>
                  <option>Filter by match</option>
                  <option>90% and above</option>
                  <option>80% and above</option>
                  <option>All matches</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[...sampleRecommendedJobs, ...sampleRecommendedJobs].map((job, index) => (
                <div key={`${job.id}-${index}`} style={{ 
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <div style={{ 
                      backgroundColor: '#dbeafe', 
                      color: '#1e40af',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {job.match}% Match
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    margin: '12px 0 4px 0' 
                  }}>
                    <a href={`/jobs/${job.id}`} style={{ 
                      color: '#111827', 
                      textDecoration: 'none' 
                    }}>
                      {job.title}
                    </a>
                  </h3>
                  <div style={{ fontSize: '14px', color: '#4b5563' }}>
                    {job.company}
                  </div>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px'
                  }}>
                    <MapPin size={14} />
                    {job.location}
                  </div>
                  
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                    <button style={{
                      flex: 1,
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      padding: '8px 0',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      Apply
                    </button>
                    <button style={{
                      width: '40px',
                      backgroundColor: 'white',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button style={{
                backgroundColor: 'white',
                color: '#2563eb',
                border: '1px solid #2563eb',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Load More Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalProfile;