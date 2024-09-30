import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                                <img src="/images/react.png" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1234 <br /> React JS</h5>
                                    <p className="wd-dashboard-course-description card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1235/Home">
                                <img src="/images/springboot.png" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1235 <br /> Spring Boot</h5>
                                    <p className="wd-dashboard-course-description card-text">Backend Development</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1236/Home">
                                <img src="/images/git.png" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1236 <br /> Git</h5>
                                    <p className="wd-dashboard-course-description card-text">Software Development</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1237/Home">
                                <img src="/images/oops.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1237 <br /> PDP</h5>
                                    <p className="wd-dashboard-course-description card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1238/Home">
                                <img src="/images/algos.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1238 <br /> Algorithms</h5>
                                    <p className="wd-dashboard-course-description card-text">Software Development</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1239/Home">
                                <img src="/images/networksecurity.png" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1239 <br /> Network Security</h5>
                                    <p className="wd-dashboard-course-description card-text">Software Development</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1240/Home">
                                <img src="/images/os.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS1240 <br /> Operating Systems</h5>
                                    <p className="wd-dashboard-course-description card-text">Software Development</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
