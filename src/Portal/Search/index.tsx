import { Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { searchJobs, searchPeople } from '../Account/client';

const SearchBar = () => {
  const [searchType, setSearchType] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for ${searchType}: "${searchQuery}"`);
    
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

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
          gap: '8px',
          marginBottom: '4px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1E3A8A'
          }}>Search</h2>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '16px',
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
              placeholder={`Search for ${searchType === 'posts' ? 'job posts' : 'people'}...`}
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
              {searchType === 'posts' ? 'Job Posts' : 'People'} Results ({searchResults.length})
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
                  ) : (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;