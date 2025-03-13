import { useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router";
import Labs from "../Labs";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import * as db from "./Database";
import KambazNavigation from "./Navigation";
import "./styles.css";

export default function kambaz() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2024-09-10", endDate: "2024-12-15",
    imgSource: "/images/reactjs.png", description: "New Description"
  });

  const addNewCourse = () => {
    const newCourse = {
      ...course,
      _id: new Date().getTime().toString()
    };
    setCourses([...courses, { ...course, ...newCourse }]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  useParams();
  return (
    <div id="wd-kambaz" className="d-flex">
      <div className="d-none d-md-block">
        < KambazNavigation />
      </div>
      <div className="wd-main-content-offset p-3 flex-grow-1 me-4">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} /></ProtectedRoute>} />
          <Route path="/Courses" element={<ProtectedRoute><Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} /></ProtectedRoute>} />
          <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="/Labs" element={<Labs />} />
        </Routes>
      </div>
    </div>
  )
}
