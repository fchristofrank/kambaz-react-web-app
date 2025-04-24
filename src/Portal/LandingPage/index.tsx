
const LandingHome = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #1e3a8a, #000000)',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      {/* Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>
          CareerConnect
        </div>
        <div>
          <button 
            onClick={() => window.location.href = '#/Portal/home'}
            style={{
              padding: '8px 16px',
              border: '1px solid white',
              borderRadius: '4px',
              background: 'transparent',
              color: 'white',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={() => window.location.href = '#/Portal/home'}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              background: '#3b82f6',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        maxWidth: '1000px',
        margin: '40px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>
          Connect with your <span style={{ color: '#60a5fa' }}>dream career</span> today
        </h1>
        
        <p style={{ fontSize: '18px', color: '#bfdbfe' }}>
          Thousands of opportunities waiting for your talent. Your next career move is just a click away.
        </p>

        {/* Course Information */}
        <div style={{
          background: 'rgba(30, 64, 175, 0.3)',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid rgba(59, 130, 246, 0.5)'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Academic Project</h3>
          <p style={{ marginBottom: '5px' }}>Developed by: <span style={{ fontWeight: 'bold' }}>Christo Frank Franklin</span></p>
          <p style={{ marginBottom: '5px' }}>Course: <span style={{ fontWeight: '500' }}>CS 5610</span></p>
          <p>Instructor: <span style={{ fontWeight: '500' }}>Jose Annunziato</span></p>
        </div>

        <div>
          <button 
            onClick={() => window.location.href = '#/Portal/home'}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              marginRight: '15px',
              cursor: 'pointer'
            }}
          >
            Get Started
          </button>
          
          <button 
            onClick={() => window.location.href = '#/Portal/home'}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        background: 'rgba(30, 58, 138, 0.5)',
        padding: '40px 20px',
        margin: '60px 0'
      }}>
        <h2 style={{ 
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '40px'
        }}>Why Choose CareerConnect?</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: 'rgba(30, 64, 175, 0.4)',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Professional Networking</h3>
            <p style={{ color: '#bfdbfe' }}>Connect with industry professionals, discover opportunities, and build meaningful relationships.</p>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(30, 64, 175, 0.4)',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Job Marketplace</h3>
            <p style={{ color: '#bfdbfe' }}>Discover career opportunities matched to your skills and experience with our smart AI matching.</p>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(30, 64, 175, 0.4)',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Skill Development</h3>
            <p style={{ color: '#bfdbfe' }}>Access courses, workshops, and resources to enhance your professional skills and stay competitive.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid rgba(59, 130, 246, 0.3)',
        marginTop: '40px'
      }}>
        <p style={{ color: '#60a5fa' }}>© 2025 CareerConnect | CS 5610 Project by Christo Frank Franklin</p>
      </footer>
    </div>
  );
};

export default LandingHome;