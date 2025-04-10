import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrolling,
    setEnrolling,
    updateEnrollment
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';


    return (
        <div id="wd-dashboard" className="container mt-4" style={{ marginTop: "200px !important" }}>
            <h1 id="wd-dashboard-title" className="text-center mb-4">Dashboard</h1>
            {!isFacultyOrAdmin && (
            <div className="d-flex justify-content-end mb-3">
            <button onClick={() => setEnrolling(!enrolling)} className="btn btn-primary">
            {enrolling ? "My Courses" : "All Courses"}
            </button>
            </div>
            )}

            {isFacultyOrAdmin && (
            <div className="mb-4">
            <h5 className="d-flex align-items-center">
            New Course
            <button
                className="btn btn-primary ms-auto"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
            >
                Add
            </button>
            <button
                className="btn btn-warning ms-2"
                onClick={updateCourse}
                id="wd-update-course-click"
            >
                Update
            </button>
            </h5>
            <input
            value={course.name}
            className="form-control mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <textarea
            value={course.description}
            className="form-control"
            placeholder="Course Description"
            onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
            }
            />
            </div>
            )}

            <h2 id="wd-dashboard-published" className="mb-3">
            {"Published Courses"} ({courses.length})
            </h2>
            <div id="wd-dashboard-courses" className="row">
            {courses.map((course: any) => (
            <div className="col-12 mb-4" key={course._id}>
            <div className="card shadow-sm">
                <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                <img
                src={course.imgSource}
                alt="Course"
                className="rounded-circle me-3"
                style={{ width: 50, height: 50 }}
                />
                <h5 className="mb-0">{course.name}</h5>
                </div>
                <p className="card-text">{course.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                <Link
                to={`/Kambaz/Courses/${course._id}/Home`}
                className="btn btn-primary"
                >
                View
                </Link>
                {isFacultyOrAdmin && (
                <div>
                    <button
                    onClick={(event) => {
                    event.preventDefault();
                    deleteCourse(course._id);
                    }}
                    className="btn btn-danger me-2"
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
                    className="btn btn-warning"
                    >
                    Edit
                    </button>
                </div>
                )}
                {!isFacultyOrAdmin && enrolling && (
                <button
                    onClick={(event) => {
                    event.preventDefault();
                    updateEnrollment(course._id, !course.enrolled);
                    }}
                    className={`btn ${
                    course.enrolled ? "btn-danger" : "btn-success"
                    }`}
                >
                    {course.enrolled ? "Unenroll" : "Enroll"}
                </button>
                )}
                </div>
                </div>
            </div>
            </div>
            ))}
            </div>
        </div>
    );
}