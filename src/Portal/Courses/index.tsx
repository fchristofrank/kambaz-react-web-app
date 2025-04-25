import { useEffect, useMemo, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import Assignments from "./Assignments";
import Editor from "./Assignments/Editor";
import * as courseClient from "./client";
import Comments from "./Comments";
import Home from "./Home";
import CoursesNavigation from "./Navigation";
import PeopleTable from "./People/Table";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = useMemo(() =>
    courses.find((course) => course._id === cid),
    [courses, cid]
  );

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (course && course._id) {
        try {
          const usersForCourses = await courseClient.findUsersForCourse(course._id);
          setUsers(usersForCourses);
        } catch (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        }
      }
    };

    fetchUsers();
  }, [course]);
  
  const { pathname } = useLocation();
  const currentSection = pathname.split("/")[4] || "Home";
  
  return (
    <div 
      id="wd-courses" 
      style={{ 
        marginTop: "140px",
        maxWidth: "1128px",
        margin: "140px auto 0",
        padding: "0 16px"
      }}
    >
      {/* Course Header */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08)",
        padding: "20px 24px",
        marginBottom: "20px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center"
        }}>
          <div style={{
            backgroundColor: "#0a66c2",
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "16px"
          }}>
            <FaBookOpen style={{ fontSize: "24px", color: "white" }} />
          </div>
          
          <div>
            <h1 style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#000000",
              margin: "0 0 4px 0"
            }}>
              {course && course.name}
            </h1>
            
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ 
                fontSize: "14px",
                color: "#666666"
              }}>
                Job Posting • {currentSection}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{
        display: "flex",
        gap: "20px"
      }}>
        {/* Navigation Sidebar */}
        <div className="courses-navigation">
          <CoursesNavigation />
        </div>
        
        {/* Main Content Area */}
        <div style={{
          flex: "1",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08)",
          padding: "20px",
          overflowX: "hidden"
        }}>
          <Routes>
            <Route path="/" element={<Navigate to="Comments" />} />
            <Route path="Apply" element={<Comments />} />
            <Route path="Home" element={<Home />} />
            <Route path="Comments" element={<Comments />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<Editor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}