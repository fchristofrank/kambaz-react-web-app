import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
            <img src="images\course1.jpeg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
            <img src="images\course2.png" width={200} />
            <div>
              <h5> CS5678 Node JS </h5>
              <p className="wd-dashboard-course-title">Backend development with Node.js</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/9101/Home" className="wd-dashboard-course-link">
            <img src="/images/course3.jpeg" width={200} />
            <div>
              <h5> CS9101 Angular </h5>
              <p className="wd-dashboard-course-title">Building dynamic web apps</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1121/Home" className="wd-dashboard-course-link">
            <img src="/images/course4.jpeg" width={200} />
            <div>
              <h5> CS1121 Python </h5>
              <p className="wd-dashboard-course-title">Introduction to Python programming</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3141/Home" className="wd-dashboard-course-link">
            <img src="/images/course5.png" width={200} />
            <div>
              <h5> CS3141 Java </h5>
              <p className="wd-dashboard-course-title">Advanced Java development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4151/Home" className="wd-dashboard-course-link">
            <img src="/images/course6.jpeg" width={200} />
            <div>
              <h5> CS4151 AWS Cloud </h5>
              <p className="wd-dashboard-course-title">Cloud computing with AWS</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5161/Home" className="wd-dashboard-course-link">
            <img src="/images/course7.jpeg" width={200} />
            <div>
              <h5> CS5161 Machine Learning </h5>
              <p className="wd-dashboard-course-title">Basics of machine learning</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6171/Home" className="wd-dashboard-course-link">
            <img src="/images/course8.jpg" width={200} />
            <div>
              <h5> CS6171 Data Science </h5>
              <p className="wd-dashboard-course-title">Data analysis and visualization</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7181/Home" className="wd-dashboard-course-link">
            <img src="/images/course9.png" width={200} />
            <div>
              <h5> CS7181 Kubernetes </h5>
              <p className="wd-dashboard-course-title">Container orchestration with Kubernetes</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/8191/Home" className="wd-dashboard-course-link">
            <img src="/images/course10.jpeg" width={200} />
            <div>
              <h5> CS8191 DevOps </h5>
              <p className="wd-dashboard-course-title">CI/CD pipelines and automation</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
