import { FaClipboardUser, FaInbox } from "react-icons/fa6";
import { ImNewspaper } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Home", path: "/Portal/home", icon: FaInbox },
    { label: "Dashboard", path: "/Portal/Dashboard", icon: ImNewspaper },
    { label: "Search", path: "/Portal/Search", icon: FaInbox }
  ];

  return (
    <header
      id="wd-portal-navigation"
      className="position-fixed w-100 top-0 z-3"
      style={{
        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.15)',
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="container d-flex align-items-center justify-content-between py-2">
        {/* Logo Section */}
        <div className="d-flex align-items-center">
          <Link 
            to="/Portal/home"
            className="text-decoration-none"
          >
            <div 
              className="d-flex align-items-center justify-content-center rounded-circle" 
              style={{ 
                width: '34px', 
                height: '34px', 
                backgroundColor: '#0a66c2',
                marginRight: '8px'
              }}
            >
              <span 
                className="fw-bold" 
                style={{ 
                  color: 'white', 
                  fontSize: '18px',
                  lineHeight: 1
                }}
              >
                K
              </span>
            </div>
          </Link>

          {/* Search Bar (static, non-functional) */}
          <div
            className="d-none d-md-flex align-items-center rounded px-3 py-1"
            style={{
              backgroundColor: '#eef3f8',
              width: '280px'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="#666"
              className="bi bi-search me-2" 
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <span className="text-muted" style={{ fontSize: '14px' }}>Search</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex">
          <div className="d-flex">
            {/* Account Link */}
            <Link
              to="/Portal/Account"
              className={`nav-item d-flex flex-column align-items-center px-3 text-decoration-none ${
                pathname.includes("Account") ? "active" : ""
              }`}
              style={{
                color: pathname.includes("Account") ? "#0a66c2" : "#666",
                borderBottom: pathname.includes("Account") ? "2px solid #0a66c2" : "2px solid transparent",
              }}
            >
              <FaClipboardUser
                className="fs-5 mb-1"
              />
              <span style={{ fontSize: '12px', fontWeight: pathname.includes("Account") ? "600" : "400" }}>
                Account
              </span>
            </Link>

            {/* Other Navigation Links */}
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item d-flex flex-column align-items-center px-3 text-decoration-none ${
                  pathname.includes(link.label) ? "active" : ""
                }`}
                style={{
                  color: pathname.includes(link.label) ? "#0a66c2" : "#666",
                  borderBottom: pathname.includes(link.label) ? "2px solid #0a66c2" : "2px solid transparent",
                }}
              >
                <link.icon className="fs-5 mb-1" />
                <span style={{ fontSize: '12px', fontWeight: pathname.includes(link.label) ? "600" : "400" }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Profile Section */}
        <div className="d-flex align-items-center">
          <div 
            className="d-flex flex-column align-items-center px-3"
            style={{ color: "#666" }}
          >
            <div 
              className="rounded-circle" 
              style={{ 
                width: "24px", 
                height: "24px", 
                backgroundColor: "#0a66c2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "4px"
              }}
            >
              U
            </div>
            <span style={{ fontSize: '12px' }}>Me</span>
          </div>
        </div>
      </div>
    </header>
  );
}