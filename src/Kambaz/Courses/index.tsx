import { useEffect, useMemo, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
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
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name}
        {pathname.split("/")[4] && ` > ${pathname.split("/")[4]}`}</h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Comments" element={<Comments />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<Editor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
