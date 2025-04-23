import { FaClipboardUser, FaInbox } from "react-icons/fa6";
import { ImNewspaper } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Home", path: "/Portal/home", icon: FaInbox },
    { label: "Feeds", path: "/Portal/Dashboard", icon: ImNewspaper },
    { label: "Search", path: "/Portal/Search", icon: FaInbox }
  ];

  return (
    <header
      id="wd-portal-navigation"
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
        borderBottom: "2px solid #0a66c2",
        padding: "10px 0",
        marginTop: "140px !important"
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "12px",
        paddingBottom: "12px"
      }}>
        {/* Logo and Brand Name */}
        <div style={{
          display: "flex",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            backgroundColor: "#0a66c2",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)"
          }}>
            <span style={{
              fontWeight: "bold",
              color: "white",
              fontSize: "22px",
              lineHeight: 1
            }}>
              C
            </span>
          </div>
          <span style={{
            marginLeft: "12px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#0a66c2"
          }}>
            CareerConnect
          </span>
        </div>

        {/* Navigation Links - Centered with larger icons */}
        <nav style={{
          paddingTop: "8px",
          paddingBottom: "8px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
            {/* Account Link */}
            <Link
              to="/Portal/Account"
              style={{
                color: pathname.includes("Account") ? "#0a66c2" : "#666",
                borderBottom: pathname.includes("Account") ? "4px solid #0a66c2" : "4px solid transparent",
                filter: pathname.includes("Account") ? "drop-shadow(0 2px 4px rgba(10, 102, 194, 0.3))" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingLeft: "16px",
                paddingRight: "16px",
                textDecoration: "none"
              }}
            >
              <FaClipboardUser
                style={{ 
                  fontSize: "30px",
                  marginBottom: "8px"
                }} 
              />
              <span style={{ 
                fontSize: "14px", 
                fontWeight: pathname.includes("Account") ? "600" : "400" 
              }}>
                Account
              </span>
            </Link>

            {/* Other Navigation Links */}
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: pathname.includes(link.label) ? "#0a66c2" : "#666",
                  borderBottom: pathname.includes(link.label) ? "4px solid #0a66c2" : "4px solid transparent",
                  filter: pathname.includes(link.label) ? "drop-shadow(0 2px 4px rgba(10, 102, 194, 0.3))" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  textDecoration: "none"
                }}
              >
                <link.icon 
                  style={{ 
                    fontSize: "30px",
                    marginBottom: "8px"
                  }} 
                />
                <span style={{ 
                  fontSize: "14px", 
                  fontWeight: pathname.includes(link.label) ? "600" : "400" 
                }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Empty div to maintain space balance */}
        <div style={{ width: "240px" }}></div>
      </div>
    </header>
  );
}