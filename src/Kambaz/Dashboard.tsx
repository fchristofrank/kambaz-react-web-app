import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as enrollmentsClient from "./Account/Enrollments/client";
import { enroll, unenroll } from "./Account/Enrollments/reducer";

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const isFaculty = currentUser.role === 'FACULTY';
    const [showAllCourses, setShowAllCourses] = useState(false);
    const enrolledCourses = courses.filter((course) =>
        enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser._id &&
                enrollment.course === course._id
        )
    );

    const displayedCourses = showAllCourses ? courses : enrolledCourses;

    const handleUnenroll = async (courseId: string) => {
        const enrollment = enrollments.find(
            (enrollment: any) =>
                enrollment.user === currentUser._id && enrollment.course === courseId
        );
        if (enrollment) {
            dispatch(unenroll(enrollment._id));
            await enrollmentsClient.unEnrollUser(courseId);
        }
    };

    const handleEnroll = async (courseId: string) => {
        dispatch(enroll({ user: currentUser._id, course: courseId }));
        await enrollmentsClient.enrollUser(courseId);
    };

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            {!isFaculty &&
                <button
                    className="btn btn-primary float-end"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                >
                    Enrollments
                </button>}

            {isFaculty && (
                <div>
                    <h5>
                        New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-warning float-end me-2"
                            onClick={updateCourse}
                            id="wd-update-course-click"
                        >
                            Update
                        </button>
                    </h5>
                    <br />
                    <input
                        value={course.name}
                        className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                    <textarea
                        value={course.description}
                        className="form-control"
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                    />
                </div>
            )}

            <h2 id="wd-dashboard-published">
                {"Published Courses"} ({enrollments.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {displayedCourses.map((course: any) => {
                        const isEnrolled = enrollments.some(
                            (enrollment: any) =>
                                enrollment.user === currentUser._id &&
                                enrollment.course === course._id
                        );

                        return (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                                <div className="card h-100 rounded-3 overflow-hidden d-flex flex-column">
                                    <Link
                                        to={isEnrolled ? `/Kambaz/Courses/${course._id}/Home` : '#'}
                                        className="wd-dashboard-course-link text-decoration-none text-dark h-100 d-flex flex-column"
                                    >
                                        <img src={course.imgSource} width="100%" height={160} />
                                        <div className="card-body flex-grow-1">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name}
                                            </h5>
                                            <p
                                                className="wd-dashboard-course-title card-text overflow-y-hidden"
                                                style={{ maxHeight: 100 }}
                                            >
                                                {course.description}
                                            </p>
                                        </div>
                                        <div className="card-footer border-top">
                                            <button className="btn btn-primary">Go</button>
                                            {isFaculty && (
                                                <>
                                                    <button
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }}
                                                        className="btn btn-danger float-end"
                                                        id="wd-delete-course-click"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning me-2 float-end"
                                                    >
                                                        Edit
                                                    </button>
                                                </>
                                            )}
                                            {!isFaculty && (
                                                <button
                                                    id={isEnrolled ? "wd-unenroll-course" : "wd-enroll-course"}
                                                    className={`btn ${isEnrolled ? "btn-danger" : "btn-success"} float-end`}
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        isEnrolled ? handleUnenroll(course._id) : handleEnroll(course._id);
                                                    }}
                                                >
                                                    {isEnrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}