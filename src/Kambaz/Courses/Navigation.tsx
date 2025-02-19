import { Link, useLocation, useParams } from "react-router-dom";
import "../Account/Signin.css";

export default function CoursesNavigation() {
  const { cid } = useParams();
  console.log(cid);
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={`/kambaz/Courses/${cid}/${link}`}
          id={`wd-course-${link}-link`}
          className={`list-group-item ${pathname.includes(link) ? "active-link" : "text-danger"}`}
          style={pathname.includes(link) ? { borderLeft: "3px solid #000", borderTop: "none", borderRight: "none", borderBottom: "none" } : { border: "none" }}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
