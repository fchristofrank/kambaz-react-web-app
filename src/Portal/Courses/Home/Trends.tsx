
const JobMarketTrends = () => {
  // Mock data for job market trends
  const jobMarketTrends = {
    applicantsPerDay: {
      value: 3,
      change: "+12%",
      positive: true,
      description: "Average daily applications"
    },
    newJobsAdded: {
      value: 6,
      change: "+5%",
      positive: true,
      description: "New jobs this week"
    },
    averageSalary: {
      value: "$92,450",
      change: "+3.2%",
      positive: true,
      description: "Average annual salary"
    },
    timeToHire: {
      value: "18 days",
      change: "-2.5 days",
      positive: true,
      description: "Average hiring time"
    }
  };

  // Monthly application data for chart
  const monthlyApplicationData = [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 5 },
    { month: 'Mar', count: 3 },
    { month: 'Apr', count: 6 }
  ];

  // Max value for scaling the chart
  const maxApplications = Math.max(...monthlyApplicationData.map(item => item.count));

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
      width: '100%',
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#333',
        textAlign: 'center'
      }}>Job Market Trends</h2>
      
      {/* Key Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Applicants Per Day */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#212529',
            marginBottom: '0.5rem'
          }}>{jobMarketTrends.applicantsPerDay.value}</div>
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            backgroundColor: '#d4edda',
            color: '#155724'
          }}>
            {jobMarketTrends.applicantsPerDay.change}
          </div>
          <div style={{
            color: '#6c757d',
            fontSize: '0.875rem'
          }}>{jobMarketTrends.applicantsPerDay.description}</div>
        </div>
        
        {/* New Jobs Added */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#212529',
            marginBottom: '0.5rem'
          }}>{jobMarketTrends.newJobsAdded.value}</div>
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            backgroundColor: '#d4edda',
            color: '#155724'
          }}>
            {jobMarketTrends.newJobsAdded.change}
          </div>
          <div style={{
            color: '#6c757d',
            fontSize: '0.875rem'
          }}>{jobMarketTrends.newJobsAdded.description}</div>
        </div>
        
        {/* Average Salary */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#212529',
            marginBottom: '0.5rem'
          }}>{jobMarketTrends.averageSalary.value}</div>
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            backgroundColor: '#d4edda',
            color: '#155724'
          }}>
            {jobMarketTrends.averageSalary.change}
          </div>
          <div style={{
            color: '#6c757d',
            fontSize: '0.875rem'
          }}>{jobMarketTrends.averageSalary.description}</div>
        </div>
        
        {/* Time to Hire */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#212529',
            marginBottom: '0.5rem'
          }}>{jobMarketTrends.timeToHire.value}</div>
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.5rem',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            backgroundColor: '#d4edda',
            color: '#155724'
          }}>
            {jobMarketTrends.timeToHire.change}
          </div>
          <div style={{
            color: '#6c757d',
            fontSize: '0.875rem'
          }}>{jobMarketTrends.timeToHire.description}</div>
        </div>
      </div>
      
      {/* Bar Chart for Monthly Applications */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '250px',
        position: 'relative',
        marginTop: '2rem',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#333',
          }}>Monthly Applications</div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          height: '200px',
          width: '100%',
          position: 'relative',
        }}>
          {/* Grid lines */}
          {[0, 1, 2, 3].map((line) => (
            <div 
              key={`gridline-${line}`} 
              style={{
                position: 'absolute',
                left: '0',
                right: '0',
                borderTop: '1px dashed #dee2e6',
                bottom: `${(line / 3) * 100}%`,
              }}
            />
          ))}
          
          {/* Bars */}
          {monthlyApplicationData.map((data, index) => {
            const barHeight = (data.count / maxApplications) * 200;
            
            return (
              <div 
                key={`bar-${index}`} 
                style={{
                  flex: '1',
                  marginRight: '20px',
                  backgroundColor: index === 5 ? '#dc3545' : '#0d6efd',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease-in-out',
                  position: 'relative',
                  height: `${barHeight}px`,
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  color: '#212529',
                  fontSize: '0.75rem',
                }}>{data.count.toLocaleString()}</div>
                <div style={{
                  position: 'absolute',
                  bottom: '-25px',
                  left: '0',
                  right: '0',
                  textAlign: 'center',
                  color: '#6c757d',
                  fontSize: '0.875rem',
                }}>{data.month}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Job Interactions Grid */}
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#333',
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        Job Interactions
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#d4edda',
            color: '#155724',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}>
            👀
          </div>
          <div>
            <div style={{
              fontWeight: 'bold',
              color: '#212529',
              marginBottom: '0.25rem'
            }}>Views</div>
            <div>12 this week</div>
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#d1ecf1',
            color: '#0c5460',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}>
            📥
          </div>
          <div>
            <div style={{
              fontWeight: 'bold',
              color: '#212529',
              marginBottom: '0.25rem'
            }}>Applications</div>
            <div>16 this week</div>
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#fff3cd',
            color: '#856404',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}>
            ⭐
          </div>
          <div>
            <div style={{
              fontWeight: 'bold',
              color: '#212529',
              marginBottom: '0.25rem'
            }}>Saved Jobs</div>
            <div>5 this week</div>
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}>
            💬
          </div>
          <div>
            <div style={{
              fontWeight: 'bold',
              color: '#212529',
              marginBottom: '0.25rem'
            }}>New connections</div>
            <div>2 this week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMarketTrends;