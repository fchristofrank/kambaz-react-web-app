import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Comments"];
  
  return (
    <div 
      id="wd-courses-navigation" 
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.05)",
        marginBottom: "20px"
      }}
    >
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#f9f9f9"
      }}>
        <h3 style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#333",
          margin: 0
        }}>
          Comment Navigation
        </h3>
      </div>
      
      <div>
        {links.map((link) => (
          <Link 
            key={link}
            to={`/Portal/Courses/${cid}/${link}`} 
            id={`wd-course-${link}-link`}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              textDecoration: "none",
              borderLeft: pathname.includes(link) ? "3px solid #0a66c2" : "3px solid transparent",
              backgroundColor: pathname.includes(link) ? "#f3f9ff" : "transparent",
              color: pathname.includes(link) ? "#0a66c2" : "#666",
              fontWeight: pathname.includes(link) ? "600" : "400",
              fontSize: "14px",
              transition: "all 0.2s ease",
              borderBottom: "1px solid #f0f0f0"
            }}
          >
            <span style={{ marginRight: "8px" }}>
              {link === "Comments" && 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                </svg>
              }
              {link === "Description" && 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                </svg>
              }
            </span>
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}