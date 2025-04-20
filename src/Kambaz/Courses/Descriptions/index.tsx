const handleButtonClick = () => {
    if (!showRecommendations) {
      // Only fetch if we're showing recommendations and haven't fetched them before
      if (keywords.length === 0 && recommendations.length === 0) {
        fetchKeywordsAndRecommendations();
      }
    }
    setShowRecommendations(!showRecommendations);
  };  // Function to fetch keywords and recommendations from Gemini API
  const fetchKeywordsAndRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock Gemini API call for demonstration purposes
      // In a real implementation, you would replace this with an actual API call to Gemini
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would make a real API call to Gemini
      // const response = await fetch('https://api.gemini.com/v1/generate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${YOUR_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     prompt: `Based on this job description, provide two things in JSON format:
      //              1. A list of 10 key skills and technologies from the job description
      //              2. A list of 7 recommendations for applicants
      //              The job description is: ${jobDescription.description}
      //              Return the response in this JSON format:
      //              {
      //                "keywords": ["keyword1", "keyword2", ...],
      //                "recommendations": ["recommendation1", "recommendation2", ...]
      //              }`,
      //     max_tokens: 500
      //   })
      // });
      
      // const data = await response.json();
      // const parsedData = JSON.parse(data.choices[0].text);
      
      // For demonstration, we'll use mock data that looks like what Gemini would return
      const mockGeminiResponse = {
        keywords: [
          "React.js", 
          "Node.js", 
          "TypeScript", 
          "PostgreSQL", 
          "AWS", 
          "RESTful APIs", 
          "GraphQL", 
          "CI/CD", 
          "Git",
          "Agile/Scrum"
        ],
        recommendations: [
          "Highlight projects where you've built full-stack applications using React and Node.js",
          "Showcase your experience with cloud services, particularly AWS deployments",
          "Demonstrate your knowledge of database design and ORM technologies",
          "Provide examples of responsive, interactive UI/UX implementations",
          "Mention any contributions to open-source projects or reusable components you've created",
          "Emphasize your experience with CI/CD workflows and DevOps principles",
          "Include metrics of performance optimizations or scalability improvements you've achieved"
        ]
      };
      
      setKeywords(mockGeminiResponse.keywords);
      setRecommendations(mockGeminiResponse.recommendations);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      setIsLoading(false);
      console.error("Error fetching from Gemini:", err);
    }
  };import React, { useState, CSSProperties } from 'react';

const JobDescriptionPage = () => {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Mock job description data
  const jobDescription = {
    title: "Senior Full-Stack Developer",
    description: `We are seeking an experienced Full-Stack Developer to join our innovative team. The ideal candidate will have a strong background in building scalable web applications using modern technologies.

In this role, you will be responsible for developing and maintaining both front-end and back-end components of our applications. You will work closely with product managers, designers, and other developers to create seamless user experiences and robust server-side functionality.

Our tech stack includes React, Node.js, TypeScript, and PostgreSQL, with AWS for cloud infrastructure. We follow agile methodologies and value clean, maintainable code with comprehensive test coverage.

Key Responsibilities:
• Design, develop, and maintain web applications using React and Node.js
• Build reusable components and front-end libraries for future use
• Translate UI/UX wireframes into responsive, interactive features
• Optimize applications for maximum speed and scalability
• Collaborate with cross-functional teams to define, design, and ship new features
• Ensure the technical feasibility of UI/UX designs
• Implement security and data protection measures
• Build and maintain efficient, reusable, and reliable code
• Identify and correct bottlenecks and bugs
• Stay up-to-date with emerging trends and technologies

Requirements:
• 5+ years of experience with JavaScript/TypeScript development
• 3+ years of experience with React.js and Node.js
• Strong understanding of web fundamentals (HTML, CSS, JavaScript)
• Experience with RESTful APIs and GraphQL
• Familiarity with database design and ORM technologies
• Knowledge of cloud services (AWS, Azure, or GCP)
• Understanding of CI/CD workflows
• Experience with version control systems (Git)
• Strong problem-solving skills and attention to detail
• Excellent communication and collaboration abilities
• BS/MS in Computer Science or equivalent practical experience

Nice to Have:
• Experience with containerization technologies (Docker, Kubernetes)
• Knowledge of serverless architecture
• Contributions to open-source projects
• Experience with microservices architecture
• Understanding of DevOps principles
• Background in Agile/Scrum methodologies

What We Offer:
• Competitive salary and benefits package
• Remote-first work environment with flexible hours
• Professional development opportunities
• Collaborative and innovative team culture
• Challenging projects that make a real impact
• Latest equipment and tools needed to excel in your role
• Regular team events and activities

Join us and be part of a team that's passionate about creating exceptional digital experiences!`,
    
    // Mock keywords and recommendations
    keywords: [
      "React.js", "Node.js", "TypeScript", "PostgreSQL", "AWS", 
      "RESTful APIs", "GraphQL", "CI/CD", "Git", "Agile"
    ],
    recommendations: [
      "Highlight projects where you've built full-stack applications",
      "Showcase examples of reusable components you've created",
      "Mention experience with similar tech stacks (React, Node.js, TypeScript)",
      "Include metrics or improvements you've achieved (e.g., performance optimizations)",
      "Demonstrate knowledge of cloud services, particularly AWS",
      "Emphasize collaborative experiences with cross-functional teams",
      "Include any open-source contributions or personal projects"
    ]
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#FFF8F1',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '2.5rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #eee',
          paddingBottom: '1rem'
        }}>{jobDescription.title}</h1>
        
        <div style={{
          fontSize: '1rem',
          lineHeight: '1.7',
          color: '#444',
          whiteSpace: 'pre-line'
        }}>{jobDescription.description}</div>
        
        {showRecommendations && (
          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            borderLeft: '5px solid #0d6efd'
          }}>
            {isLoading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '2rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '5px solid #e9ecef',
                  borderTopColor: '#0d6efd',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1rem'
                }}></div>
                <p style={{
                  color: '#6c757d',
                  fontSize: '1rem'
                }}>Analyzing job description with Gemini...</p>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
            ) : error ? (
              <div style={{
                color: '#721c24',
                backgroundColor: '#f8d7da',
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            ) : (
              <>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '1rem'
                }}>Key Skills & Technologies</h2>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '2rem'
                }}>
                  {keywords.map((keyword, index) => (
                    <span key={index} style={{
                      backgroundColor: '#e9f2ff',
                      color: '#0d6efd',
                      padding: '0.5rem 1rem',
                      borderRadius: '50px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>{keyword}</span>
                  ))}
                </div>
                
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '1rem',
                  marginTop: '2rem'
                }}>Application Recommendations</h2>
                
                <ul style={{
                  listStyleType: 'none',
                  padding: '0'
                }}>
                  {recommendations.map((recommendation, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        color: '#0d6efd',
                        marginRight: '0.75rem',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}>•</span>
                      <span style={{
                        color: '#444',
                        fontSize: '1rem',
                        lineHeight: '1.5'
                      }}>{recommendation}</span>
                    </li>
                  ))}
                </ul>
                
                <div style={{
                  fontSize: '0.9rem',
                  color: '#6c757d',
                  marginTop: '2rem',
                  textAlign: 'center',
                  backgroundColor: '#e9f2ff',
                  padding: '0.5rem',
                  borderRadius: '0.5rem'
                }}>
                  <em>Powered by Gemini AI</em>
                </div>
              </>
            )}
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem'
        }}>
          <button 
            style={{
              backgroundColor: '#0d6efd',
              color: 'white',
              fontSize: '1.25rem',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: 'none',
              boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onClick={handleButtonClick}
            onMouseOver={(e) => {
              const target = e.currentTarget;
              target.style.backgroundColor = '#0b5ed7';
              target.style.transform = 'translateY(-3px)';
              target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget;
              target.style.backgroundColor = '#0d6efd';
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
            }}
          >
            {isLoading ? 'Analyzing...' : (showRecommendations ? 'Hide Recommendations' : 'Show Keywords & Recommendations')}
            {!isLoading && <span style={{ fontSize: '1.5rem' }}>{showRecommendations ? '↑' : '↓'}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;