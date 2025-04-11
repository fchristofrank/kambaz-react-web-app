import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateLikesInPost } from "./Account/client";

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

    //const [count, setCount] = useState(0);
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

            <div className="mb-4">
                <h5 className="d-flex align-items-center">
                    Create a Post
                    <button
                        className="btn btn-primary ms-auto"
                        id="wd-add-new-post-click"
                        onClick={addNewCourse}
                    >
                        {enrolling ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            "Post"
                        )}
                    </button>
                    <button
                        className="btn btn-warning ms-2"
                        onClick={updateCourse}
                        id="wd-update-post-click"
                    >
                        Update
                    </button>
                </h5>
                <input
                    value={course.name}
                    className="form-control mb-2 shadow-sm"
                    placeholder="Job Title"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    style={{
                        transition: "box-shadow 0.3s ease-in-out",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    onFocus={(e) =>
                        (e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)")
                    }
                    onBlur={(e) =>
                        (e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
                    }
                />
                <textarea
                    value={course.description}
                    className="form-control shadow-sm"
                    placeholder="Job Description"
                    onChange={(e) =>
                        setCourse({ ...course, description: e.target.value })
                    }
                    style={{
                        transition: "box-shadow 0.3s ease-in-out",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    onFocus={(e) =>
                        (e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)")
                    }
                    onBlur={(e) =>
                        (e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
                    }
                />
            </div>

            <h2 id="wd-dashboard-published" className="mb-3">
                {"Published Courses"} ({courses.length})
            </h2>
            <div id="wd-dashboard-courses" className="row">
                {courses.map((course: any) => (
                    <div className="col-12 mb-4" key={course._id}>
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex align-items-start mb-3">
                                    <img
                                        src={course.imgSource}
                                        alt="Course"
                                        className="rounded-circle me-3"
                                        style={{ width: 50, height: 50, float: "left" }}
                                    />
                                    <div>
                                        <h5 className="mb-0">{course.name}</h5>
                                        <p className="card-text">{course.description}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button 
                                        className="btn btn-success d-flex align-items-center me-2"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            const updatedLikes = (course.likes || 0) + 1;
                                            // Update local state immediately
                                            const updatedCourse = { ...course, likes: updatedLikes };
                                            courses.forEach((c, index) => {
                                                if (c._id === course._id) {
                                                    courses[index] = updatedCourse;
                                                }
                                            });
                                            setCourse(updatedCourse);
                                            // Update backend
                                            await updateLikesInPost(updatedLikes, course._id);
                                        }}
                                        style={{
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="16" 
                                            height="16" 
                                            fill="currentColor" 
                                            className="bi bi-hand-thumbs-up me-2" 
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                        </svg>
                                        <span>{course.likes || 0}</span>
                                    </button>
                                    <Link
                                        to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="btn btn-primary d-flex align-items-center"
                                    >
                                        Know More!
                                    </Link>
                                </div>
                                {isFacultyOrAdmin && (
                                    <div className="d-flex justify-content-end">
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
                                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"
                                            }`}
                                    >
                                        {course.enrolled ? "Unenroll" : "Enroll"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
        </div >
    );
}