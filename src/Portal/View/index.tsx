import { Award, Briefcase, Check, Clock, Link, MapPin, User, Users } from 'lucide-react';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUserById } from '../Account/client';

function ProfessionalProfile(currentUser: any) {
    const navigate = useNavigate();
    
    // Tabs for different sections
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [userData, setUserData] = useState<any>(null);
    const [sampleConnections, setSampleConnections] = useState<any[]>([]);
    
    // Connection animation state
    const [showConnectionAnimation, setShowConnectionAnimation] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionAnimationStage, setConnectionAnimationStage] = useState(0); // 0: initial, 1: growing, 2: complete, 3: fading

    // Get userID from URL
    const hashPath = window.location.hash;
    const lastSegment = hashPath.split('/').pop();
    console.log(hashPath);
    console.log(lastSegment);
    const userID = lastSegment || '';

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

    // Check if already connected
    useEffect(() => {
        if (currentUser && currentUser.currentUser && userData) {
            const isAlreadyConnected = currentUser.currentUser.connections && 
                currentUser.currentUser.connections.includes(userID);
            setIsConnected(isAlreadyConnected);
        }
    }, [currentUser, userData, userID]);

    useEffect(() => {
        // Fetch user data
        findUserById(userID)
            .then(data => {
                setUserData(data);
                console.log(data);
                getSampleConnections(data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [userID]);

    // Animation sequence for connection
    useEffect(() => {
        if (showConnectionAnimation) {
            // Stage 1: Initial appearance and growing
            setConnectionAnimationStage(1);
            
            // Stage 2: Complete state
            const timer1 = setTimeout(() => {
                setConnectionAnimationStage(2);
            }, 600);
            
            // Stage 3: Fade out
            const timer2 = setTimeout(() => {
                setConnectionAnimationStage(3);
            }, 2500);
            
            // Hide animation
            const timer3 = setTimeout(() => {
                setShowConnectionAnimation(false);
            }, 3100);
            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [showConnectionAnimation]);

    // Function to navigate to a connection's profile
    const goToConnectionProfile = (connectionId: string) => {
        navigate(`/portal/profile/${connectionId}`);
    };

    const addConnection = () => {
        if (!currentUser || !currentUser.currentUser || !currentUser.currentUser._id) {
            console.error("Current user information is missing");
            return;
        }
        
        console.log(currentUser.currentUser._id);
        const currentUserID = currentUser.currentUser._id;
        console.log(userID);

        if (!currentUserID || !userID) {
            console.error("Missing userID or connectionID");
            return;
        }

        // Start connection animation
        setShowConnectionAnimation(true);

        const requestBody = {
            userID: currentUserID,
            connectionID: userID,
        };

        fetch("http://localhost:4000/api/users/addConnection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Connection added successfully:", data);
                setIsConnected(true);
                
                // Update the current user's connections locally
                if (currentUser && currentUser.currentUser) {
                    if (!currentUser.currentUser.connections) {
                        currentUser.currentUser.connections = [];
                    }
                    if (!currentUser.currentUser.connections.includes(userID)) {
                        currentUser.currentUser.connections.push(userID);
                    }
                }
            })
            .catch((error) => {
                console.error("Error adding connection:", error);
                // If there's an error, hide the animation
                setShowConnectionAnimation(false);
            });
    };

    const getSampleConnections = (data: any) => {
        // Check if data and connections array exist
        console.log(data);
        if (!data || !data.connections || !Array.isArray(data.connections)) {
            console.log("No connections found in data:", data);
            setSampleConnections([]);
            return;
        }

        console.log("Found connections in data:", data.connections);

        // Create an array to store promises for all connection fetches
        const connectionPromises = data.connections.map((connectionId: string) => {
            console.log("Fetching connection with ID:", connectionId);
            return findUserById(connectionId)
                .then(connectionData => {
                    console.log("Successfully fetched connection data:", connectionData);
                    return connectionData;
                })
                .catch(error => {
                    console.error(`Error fetching connection ${connectionId}:`, error);
                    return null; // Return null for failed fetches
                });
        });

        // Wait for all promises to resolve and filter out any null results
        Promise.all(connectionPromises)
            .then(results => {
                console.log("All connection promises resolved:", results);
                const validConnections = results.filter(connection => connection !== null);
                console.log("Setting sample connections with valid data:", validConnections);
                setSampleConnections(validConnections);
            })
            .catch(error => {
                console.error("Error in Promise.all for connections:", error);
                setSampleConnections([]);
            });
    };

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

    // Get animation styles based on stage
    const getAnimationStyle = () => {
        if (!showConnectionAnimation) {
            return { opacity: 0, display: 'none' };
        }

        switch (connectionAnimationStage) {
            case 1: // Initial appearance + growing
                return {
                    opacity: 1,
                    transform: 'scale(1)',
                    transition: 'opacity 0.3s ease-in, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                };
            case 2: // Complete state
                return {
                    opacity: 1,
                    transform: 'scale(1)',
                };
            case 3: // Fading out
                return {
                    opacity: 0,
                    transform: 'scale(1.1)',
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                };
            default:
                return {
                    opacity: 0,
                    transform: 'scale(0.5)',
                };
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Connection Animation Overlay */}
            {showConnectionAnimation && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: connectionAnimationStage === 0 ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '450px',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                        ...getAnimationStyle()
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#dcfce7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px auto'
                        }}>
                            <Check size={40} color="#16a34a" />
                        </div>
                        
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#111827',
                            marginBottom: '16px'
                        }}>
                            Connection Successful!
                        </h2>
                        
                        <p style={{
                            fontSize: '16px',
                            color: '#4b5563',
                            marginBottom: '20px'
                        }}>
                            You are now connected with <strong>{userData.firstName} {userData.lastName}</strong>
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '16px',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#2563eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                border: '3px solid #ffffff',
                                boxShadow: '0 0 0 2px #2563eb'
                            }}>
                                {currentUser?.currentUser?.firstName?.charAt(0) || 'Y'}
                            </div>
                            
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '2px',
                                    backgroundColor: '#2563eb'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    right: '0',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#2563eb'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    left: '0',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#2563eb'
                                }}></div>
                            </div>
                            
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#2563eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                border: '3px solid #ffffff',
                                boxShadow: '0 0 0 2px #2563eb'
                            }}>
                                {userData.firstName?.charAt(0) || '?'}
                            </div>
                        </div>
                        
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '8px',
                            marginBottom: '16px'
                        }}>
                            <p style={{
                                fontSize: '14px',
                                color: '#4b5563',
                                margin: '0 0 4px 0'
                            }}>
                                <strong>{userData.firstName} {userData.lastName}</strong>
                            </p>
                            <p style={{
                                fontSize: '14px',
                                color: '#6b7280',
                                margin: 0
                            }}>
                                {getCurrentRole()} at {userData.company || 'Stark Industries'}
                            </p>
                        </div>
                        
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280'
                        }}>
                            You can now message and collaborate with {userData.firstName}
                        </p>
                    </div>
                </div>
            )}

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
                            {isLoggedIn && !isConnected && (
                                <button
                                    style={{
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
                                    }}
                                    onClick={addConnection}
                                >
                                    <Users size={16} />
                                    Connect
                                </button>
                            )}
                            
                            {isLoggedIn && isConnected && (
                                <button
                                    style={{
                                        backgroundColor: '#f3f4f6',
                                        color: '#4b5563',
                                        border: '1px solid #d1d5db',
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        cursor: 'default',
                                        marginRight: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    <Check size={16} />
                                    Connected
                                </button>
                            )}
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
                {activeTab === 'connections' && isLoggedIn && (
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
                                <Users size={20} /> Connections ({userData?.connections?.length || 0})
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {sampleConnections.length > 0 ? (
                                    sampleConnections.map(connection => (
                                        <div
                                            key={connection?._id || connection?.id || Math.random()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #e5e7eb',
                                                backgroundColor: '#f9fafb',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onClick={() => goToConnectionProfile(connection?._id || '')}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f9fafb';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
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
                                                {(connection?.firstName || connection?.firstname || 'U').charAt(0)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '500' }}>
                                                    {connection?.firstName || connection?.firstname || 'Unknown'} {connection?.lastName || connection?.lastname || 'User'}
                                                </div>
                                                <div style={{ fontSize: '14px', color: '#4b5563' }}>
                                                    {connection?.role || connection?.title || 'Role not specified'}
                                                </div>
                                                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                                                    {connection?.currentOrganization || connection?.company || 'Company not specified'}
                                                </div>
                                                {connection?.skills && connection?.skills.length > 0 && (
                                                    <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                                                        {connection.skills.slice(0, 2).map((skill: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
                                                            <span key={idx} style={{
                                                                backgroundColor: '#e0f2fe',
                                                                color: '#0369a1',
                                                                padding: '2px 6px',
                                                                borderRadius: '12px',
                                                                fontSize: '11px'
                                                            }}>
                                                                {skill}
                                                            </span>
                                                        ))}
                                                        {connection.skills.length > 2 && (
                                                            <span style={{
                                                                backgroundColor: '#f3f4f6',
                                                                color: '#6b7280',
                                                                padding: '2px 6px',
                                                                borderRadius: '12px',
                                                                fontSize: '11px'
                                                            }}>
                                                                +{connection.skills.length - 2} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{
                                        textAlign: 'center',
                                        color: '#6b7280',
                                        fontSize: '14px',
                                        padding: '20px',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '8px',
                                        border: '1px dashed #d1d5db'
                                    }}>
                                        No connections available. Connect with other professionals to grow your network.
                                    </div>
                                )}
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