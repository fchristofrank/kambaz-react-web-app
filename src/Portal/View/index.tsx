import { Award, Briefcase, Clock, Link, Mail, MapPin, MessageSquare, User, Users } from 'lucide-react';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { findUserById } from '../Account/client';

function ProfessionalProfile() {
    // Tabs for different sections
    const [activeTab, setActiveTab] = useState('overview');
    const [userData, setUserData] = useState<any>(null);

    // Sample connections data for display
    const sampleConnections = [
        { id: "1", name: "Steve Rogers", username: "captain_america", role: "UI/UX Designer", company: "Shield Design" },
        { id: "2", name: "Natasha Romanoff", username: "black_widow", role: "Security Specialist", company: "Avengers Corp" },
        { id: "3", name: "Bruce Banner", username: "hulk", role: "Research Scientist", company: "Stark Industries" }
    ];

    useEffect(() => {
        // Get userID from URL
        const lastSegment = window.location.pathname.split('/').pop();
        const userID = lastSegment || '';

        // Fetch user data
        findUserById(userID)
            .then(data => {
                setUserData(data);
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, []);



    // Get user's current role or title (with fallback)
    const getCurrentRole = () => {
        if (!userData) return 'Professional';
        if (userData.title) return userData.title;
        if (userData.role) return userData.role;
        return 'Professional';
    };

    // Function to safely get skills or provide defaults
    const getUserSkills = () => {
        if (!userData) return ['No skills listed'];
        if (userData.skills && Array.isArray(userData.skills) && userData.skills.length > 0) {
            return userData.skills;
        }
        return ['No skills listed'];
    };

    // If data is still loading, show loading state
    if (!userData) {
        return <div>Loading profile...</div>;
    }

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
                    {userData.firstName?.charAt(0) || '?'}{userData.lastName?.charAt(0) || ''}
                </div>

                {/* User Info */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
                            {userData.firstName || ''} {userData.lastName || ''}
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
                        {getCurrentRole()} at {userData.company || 'Stark Industries'}
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
                            {userData.location || 'New York, NY'}
                        </div>
                        {userData.website && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#6b7280',
                                fontSize: '14px'
                            }}>
                                <Link size={14} />
                                <a href={userData.website} style={{ color: '#2563eb', textDecoration: 'none' }}>
                                    {userData.website}
                                </a>
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: '16px', marginTop: '16px', color: '#374151' }}>
                        {userData.description || `Experienced ${getCurrentRole()} with a focus on innovative solutions and team leadership.`}
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
                                Active: <strong>{userData.totalActivity || 'Recently'}</strong>
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
                {['Overview', 'Experience', 'Connections'].map(tab => (
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
                                    <div style={{ fontWeight: '500' }}>{getCurrentRole()} at {userData.company || 'Stark Industries'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Experience</div>
                                    <div style={{ fontWeight: '500' }}>{userData.experience ? `${userData.experience} years` : 'Experienced professional'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Education</div>
                                    <div style={{ fontWeight: '500' }}>{userData.education || 'MIT (Massachusetts Institute of Technology)'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#6b7280' }}>Email</div>
                                    <div>{userData.email || 'Not provided'}</div>
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
                                {getUserSkills().concat([
                                    'Leadership',
                                    'Project Management',
                                    'System Design',
                                    'Agile Methodologies'
                                ]).map((skill: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
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
                            {/* If Experience data exists, use it, otherwise show sample data */}
                            {userData.Experience ? (
                                userData.Experience.map((exp: (string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined)[], index: Key | null | undefined) => (
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
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Sample experience data if none exists
                                <>
                                    <div style={{ display: 'flex', gap: '16px' }}>
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
                                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Software Engineer at Stark Industries</div>
                                            <div style={{ fontSize: '15px', color: '#4b5563', marginTop: '4px' }}>January 2022 - Present</div>
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

                                            <div style={{ marginTop: '12px', fontSize: '15px', color: '#4b5563' }}>
                                                Leading development of innovative software solutions with focus on scalability and user experience.
                                            </div>

                                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                                {["Java", "Python", "Leadership"].map((skill, i) => (
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

                                    <div style={{ display: 'flex', gap: '16px' }}>
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
                                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Senior Developer at Shield Tech</div>
                                            <div style={{ fontSize: '15px', color: '#4b5563', marginTop: '4px' }}>March 2019 - December 2021</div>

                                            <div style={{ marginTop: '12px', fontSize: '15px', color: '#4b5563' }}>
                                                Developed secure applications for government clients, focusing on high-security environments.
                                            </div>

                                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                                {["Security", "Backend", "API Development"].map((skill, i) => (
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
                                </>
                            )}
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
                                <Users size={20} /> Connections ({userData.connections?.length || 0})
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
}

export default ProfessionalProfile;