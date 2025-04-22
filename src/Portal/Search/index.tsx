import axios from 'axios';
import { ExternalLink, Search } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { searchJobs, searchPeople } from '../Account/client';

// Define types for search results and search state
type SearchState = {
  searchType: 'posts' | 'people' | 'external';
  searchQuery: string;
  searchResults: any[];
  isLoading: boolean;
  error: string | null;
};

// Type for LinkedIn job listings from external API
type LinkedInJob = {
  id: string;
  title: string;
  organization: string;
  locations_derived: string[];
  url: string;
  date_posted: string;
  li_hiring_manager_name: string | null;
  li_hiring_manager_title: string | null;
  li_hiring_manager_url: string | null;
  ai_hiring_manager_name: string | null;
  ai_hiring_manager_email_address: string | null;
};

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize state with values from localStorage if available
  const [searchType, setSearchType] = useState<'posts' | 'people' | 'external'>(() => {
    const savedState = localStorage.getItem('searchState');
    return savedState ? JSON.parse(savedState).searchType : 'posts';
  });
  
  const [searchQuery, setSearchQuery] = useState(() => {
    const savedState = localStorage.getItem('searchState');
    return savedState ? JSON.parse(savedState).searchQuery : '';
  });
  
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const [searchResults, setSearchResults] = useState<any[]>(() => {
    const savedState = localStorage.getItem('searchState');
    return savedState ? JSON.parse(savedState).searchResults : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const [error, setError] = useState<string | null>(() => {
    const savedState = localStorage.getItem('searchState');
    return savedState ? JSON.parse(savedState).error : null;
  });

  // Cached external API data
  const [externalJobsData, setExternalJobsData] = useState<LinkedInJob[]>([]);
  const [externalDataLoaded, setExternalDataLoaded] = useState(false);

  // Load external data on component mount
  useEffect(() => {
    if (!externalDataLoaded) {
      fetchExternalData();
    }
  }, [externalDataLoaded]);

  // Effect to save search state to localStorage whenever relevant state changes
  useEffect(() => {
    const searchState: SearchState = {
      searchType,
      searchQuery,
      searchResults,
      isLoading,
      error
    };
    localStorage.setItem('searchState', JSON.stringify(searchState));
  }, [searchType, searchQuery, searchResults, isLoading, error]);

  // Effect to restore search results when navigating back to this page
  useEffect(() => {
    // Check if we're coming back to this page
    const savedState = localStorage.getItem('searchState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Only update if there were previous results
      if (parsedState.searchResults && parsedState.searchResults.length > 0) {
        setSearchType(parsedState.searchType);
        setSearchQuery(parsedState.searchQuery);
        setSearchResults(parsedState.searchResults);
        setError(parsedState.error);
      }
    }
  }, [location]);

  // Function to fetch external data
  const fetchExternalData = async () => {
    setIsLoading(true);
    
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://hiring-manager-api.p.rapidapi.com/recruitment-manager-24h',
        headers: {
          'x-rapidapi-key': '4fc85a98e0msh159555e3ed61854p1ae096jsn427ed23f2d39',
          'x-rapidapi-host': 'hiring-manager-api.p.rapidapi.com'
        }
      });
      
      setExternalJobsData(response.data);
      setExternalDataLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching external data:', error);
      setError('Failed to load external job listings. Please try again later.');
      setIsLoading(false);
    }
  };

  // Filter external data based on search query - focusing on hiring managers with matching titles
  const filterExternalData = (query: string) => {
    if (!query.trim()) return [];
    
    const lowerCaseQuery = query.toLowerCase().trim();
    
    return externalJobsData.filter(job => {
      // Focus primarily on matching hiring manager titles
      const managerTitleMatch = job.li_hiring_manager_title && 
        job.li_hiring_manager_title.toLowerCase().includes(lowerCaseQuery);
      
      // Secondary match on job title if it matches professional titles
      const jobTitleMatch = job.title.toLowerCase().includes(lowerCaseQuery);
      
      // Match on hiring manager names
      const managerNameMatch = 
        (job.li_hiring_manager_name && job.li_hiring_manager_name.toLowerCase().includes(lowerCaseQuery)) ||
        (job.ai_hiring_manager_name && job.ai_hiring_manager_name.toLowerCase().includes(lowerCaseQuery));
        
      return managerTitleMatch || jobTitleMatch || managerNameMatch;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for ${searchType}: "${searchQuery}"`);
    
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    if (searchType === 'external') {
      if (!externalDataLoaded) {
        fetchExternalData().then(() => {
          const filteredResults = filterExternalData(searchQuery);
          setSearchResults(filteredResults);
          setIsLoading(false);
        });
      } else {
        const filteredResults = filterExternalData(searchQuery);
        setSearchResults(filteredResults);
        setIsLoading(false);
      }
    } else {
      const fetchResults = async () => {
        let results = [];
        if (searchType === 'people') {
          results = await searchPeople(searchQuery);
        } else {    
          results = await searchJobs(searchQuery);
        }
        return results;
      };

      fetchResults().then((results) => {
        setSearchResults(results);
        setIsLoading(false);
      }).catch((error) => {
        console.log('Error fetching results:', error);
        setError('Failed to perform search. Please try again.');
        setIsLoading(false);
      });
    }
  };

  // Function to open LinkedIn URL in a new tab
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Clear search function
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    localStorage.removeItem('searchState');
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '768px',
      margin: '0 auto',
      padding: '16px',
      backgroundColor: '#EBF5FF',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '4px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1E3A8A'
          }}>Search</h2>
          
          {searchResults.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              style={{
                padding: '4px 8px',
                backgroundColor: 'transparent',
                color: '#4B5563',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear Results
            </button>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="radio"
              id="search-posts"
              name="searchType"
              value="posts"
              checked={searchType === 'posts'}
              onChange={() => setSearchType('posts')}
              style={{
                marginRight: '8px',
                height: '16px',
                width: '16px'
              }}
            />
            <label htmlFor="search-posts" style={{
              color: '#1E40AF',
              fontWeight: '500'
            }}>
              Job Posts
            </label>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="radio"
              id="search-people"
              name="searchType"
              value="people"
              checked={searchType === 'people'}
              onChange={() => setSearchType('people')}
              style={{
                marginRight: '8px',
                height: '16px',
                width: '16px'
              }}
            />
            <label htmlFor="search-people" style={{
              color: '#1E40AF',
              fontWeight: '500'
            }}>
              People
            </label>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="radio"
              id="search-external"
              name="searchType"
              value="external"
              checked={searchType === 'external'}
              onChange={() => setSearchType('external')}
              style={{
                marginRight: '8px',
                height: '16px',
                width: '16px'
              }}
            />
            <label htmlFor="search-external" style={{
              color: '#1E40AF',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              LinkedIn Jobs <ExternalLink size={14} />
            </label>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          width: '100%'
        }}>
          <div style={{
            position: 'relative',
            flex: 1
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === 'posts' 
                  ? 'Search for job posts...' 
                  : searchType === 'people' 
                    ? 'Search for people...' 
                    : 'Search LinkedIn jobs...'
              }
              style={{
                width: '100%',
                padding: '12px',
                paddingRight: '40px',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
                border: '1px solid #93C5FD',
                borderRight: 'none',
                outline: 'none'
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              paddingRight: '12px',
              pointerEvents: 'none'
            }}>
              <Search size={20} color="#3B82F6" />
            </div>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: isButtonHovered ? '#1D4ED8' : '#2563EB',
              color: 'white',
              padding: '12px 16px',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
              fontWeight: '500',
              cursor: isLoading ? 'wait' : 'pointer',
              border: 'none',
              opacity: isLoading ? 0.7 : 1
            }}
            disabled={isLoading || !searchQuery.trim()}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {searchType === 'posts' && (
          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#2563EB'
          }}>
            Search for job posts by title, skills, or description
          </div>
        )}
        
        {searchType === 'people' && (
          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#2563EB'
          }}>
            Search for people by name, skills, or department
          </div>
        )}
        
        {searchType === 'external' && (
          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#2563EB'
          }}>
            Search for hiring managers by professional title or name
          </div>
        )}
        
        {error && (
          <div style={{
            marginTop: '12px',
            fontSize: '14px',
            color: '#DC2626',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}
      </form>

      <div className="searchResults">
        {searchResults.length > 0 && (
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#1E3A8A',
              marginBottom: '12px'
            }}>
              {searchType === 'posts' 
                ? 'Job Posts' 
                : searchType === 'people' 
                  ? 'People' 
                  : 'LinkedIn Jobs'} Results ({searchResults.length})
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {searchResults.map((result, index) => (
                <div key={index} style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#F9FAFB'
                }}>
                  {searchType === 'posts' ? (
                    // Job post result card
                    <div>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '8px'
                      }}>
                        {result.name || 'Job Title'}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        marginBottom: '8px'
                      }}>
                        {result.description?.substring(0, 150) || 'Job description...'}
                        {result.description?.length > 150 ? '...' : ''}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '8px'
                      }}>
                        {result.skills?.slice(0, 3).map((skill: string, i: number) => (
                          <span key={i} style={{
                            padding: '4px 8px',
                            backgroundColor: '#DBEAFE',
                            color: '#2563EB',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '12px'
                      }}>
                        <Link
                          to={`/Portal/Courses/${result._id}/Apply`}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#2563EB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ) : searchType === 'people' ? (
                    // Person result card
                    <div>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '4px'
                      }}>
                        {result.firstName || 'Person Name'}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#4B5563',
                        marginBottom: '8px'
                      }}>
                        {result.email || 'Title/Position'}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#6B7280'
                      }}>
                        {result.department || 'Department'} 
                        {result.department && result.location ? ' • ' : ''}
                        {result.location || ''}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '8px'
                      }}>
                        {result.skills?.slice(0, 3).map((skill: string, i: number) => (
                          <span key={i} style={{
                            padding: '4px 8px',
                            backgroundColor: '#E0F2FE',
                            color: '#0369A1',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '12px'
                      }}>
                        <Link
                          to={`/portal/profile/${result._id}`}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#2563EB',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ) : (
                    // External LinkedIn hiring manager result card
                    <div>
                      {/* Hiring manager info as primary content */}
                      <div style={{
                        marginBottom: '12px',
                        padding: '10px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {result.li_hiring_manager_name || result.ai_hiring_manager_name || 'Hiring Manager'}
                          <span style={{
                            fontSize: '12px',
                            padding: '2px 6px',
                            backgroundColor: '#EBF5FF',
                            color: '#2563EB',
                            borderRadius: '4px',
                            fontWeight: 'normal'
                          }}>
                            LinkedIn
                          </span>
                        </h4>
                        
                        {result.li_hiring_manager_title && (
                          <p style={{
                            fontSize: '14px',
                            color: '#4B5563',
                            margin: '0 0 6px 0',
                            fontWeight: '500'
                          }}>
                            {result.li_hiring_manager_title}
                          </p>
                        )}
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '6px'
                        }}>
                          <span style={{
                            padding: '3px 8px',
                            backgroundColor: '#DBEAFE',
                            color: '#1E40AF',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            Recruiting
                          </span>
                          
                          {result.li_hiring_manager_url && (
                            <a 
                              href={result.li_hiring_manager_url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '12px',
                                color: '#2563EB',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px'
                              }}
                            >
                              LinkedIn Profile <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Job info as secondary content */}
                      <div>
                        <p style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '4px'
                        }}>
                          Hiring for: {result.title}
                        </p>
                        <p style={{
                          fontSize: '14px',
                          color: '#4B5563',
                          marginBottom: '2px'
                        }}>
                          {result.organization}
                        </p>
                        <p style={{
                          fontSize: '13px',
                          color: '#6B7280',
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '8px'
                        }}>
                          <span>📍 {result.locations_derived?.[0] || 'Remote'}</span>
                          <span>•</span>
                          <span>📅 Posted: {formatDate(result.date_posted)}</span>
                        </p>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '12px'
                      }}>
                        <button
                          onClick={() => openExternalLink(result.url)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#0A66C2', // LinkedIn blue
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#084A8E'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0A66C2'}
                        >
                          View on LinkedIn <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {searchResults.length === 0 && !isLoading && searchQuery.trim() && (
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            color: '#6B7280'
          }}>
            <p>No results found for "{searchQuery}"</p>
            {searchType === 'external' && !externalDataLoaded && (
              <button
                onClick={fetchExternalData}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  color: '#2563EB',
                  border: '1px solid #2563EB',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Refresh External Data
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;