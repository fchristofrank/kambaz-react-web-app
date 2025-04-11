import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import * as userClient from "./Account/client";
import * as enrollmentsClient from "./Account/Enrollments/client";
import { enroll, unenroll } from "./Account/Enrollments/reducer";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/session";
import Courses from "./Courses";
import * as courseClient from "./Courses/client";
import { addCourse } from "./Courses/reducer";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Search from "./Search";
import "./styles.css";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "Title of the Posts!", number: "New Number",
    startDate: "2024-09-10", endDate: "2024-12-15",
    imgSource: "/images/reactjs.png", description: "Post Job Description"
  });
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.fetchAllCourses();
      console.log(courses);
      const updatedCourses = courses.map((course: any) => ({
        ...course,
        enrolled: true
      }));
      setCourses(updatedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };
 
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, { ...course, ...newCourse }]);
    dispatch(addCourse(course));
    dispatch(enroll({ user: currentUser._id, course: newCourse._id }));
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    const enrollment = enrollments.find(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
    if (enrollment) {
      dispatch(unenroll(enrollment._id));
      await enrollmentsClient.unEnrollUser(courseId);
    }
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
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
    <Session>
      <div id="wd-kambaz" className="d-flex">
        <div className="d-none d-md-block">
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-grow-1 me-4">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<ProtectedRoute><Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} enrolling={enrolling} setEnrolling={setEnrolling} updateEnrollment={updateEnrollment}/></ProtectedRoute>} />
            <Route path="/Courses" element={<ProtectedRoute><Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse} enrolling={enrolling} setEnrolling={setEnrolling} updateEnrollment={updateEnrollment}/></ProtectedRoute>} />
            <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/search" element={< Search />} />
          </Routes>
        </div>
      </div>
    </Session>
  )
}
