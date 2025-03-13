import { Link, useLocation, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/kambaz/Courses/${cid}/${link}`} id={`wd-course-${link}-link`}
          className={`list-group-item border-0 ${pathname.includes(link) ? "active border" : "text-danger"}`}>{link}</Link>
      ))
      }
    </div>
  );
}
