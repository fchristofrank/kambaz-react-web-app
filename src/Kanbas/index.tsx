import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import Labs from "../Labs";
import * as db from "./Database";
import { useState } from "react";

export default function Kanbas() {
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

  return (
    <div id="wd-kanbas" className="d-flex">
      <div className="d-none d-md-block">
        <KanbasNavigation />
      </div>
      <div className="wd-main-content-offset p-3 flex-grow-1 me-4">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} />} />
          <Route path="/Courses" element={<Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} />} />
          <Route path="/Courses/:cid/*" element={<Courses courses={courses}/>} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="/Labs" element={<Labs />} />
        </Routes>
      </div>
    </div>
  )
}
