import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const courses = [
  { id: 1234, title: "CS1234 React JS", description: "Full Stack software developer", image: "/images/course1.jpeg" },
  { id: 1235, title: "Node", description: "Full Stack software developer", image: "/images/course2.png" },
  { id: 1236, title: "Angular", description: "Full Stack software developer", image: "/images/course3.jpeg" },
  { id: 1237, title: "Python", description: "Full Stack software developer", image: "/images/course4.jpeg" },
  { id: 1238, title: "Java", description: "Full Stack software developer", image: "/images/course5.png" },
  { id: 1239, title: "Cloud Computing", description: "Full Stack software developer", image: "/images/course6.jpeg" },
  { id: 1240, title: "Machine Learning", description: "Full Stack software developer", image: "/images/course7.jpeg" },
  { id: 1241, title: "Atom", description: "Full Stack software developer", image: "/images/course8.jpg" },
  { id: 1242, title: "Kubernetes", description: "Full Stack software developer", image: "/images/course9.png" },
  { id: 1243, title: "DevOps", description: "Software Devlopment Lifecycle", image: "/images/course10.jpeg" },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map(course => (
            <Col key={course.id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card style={{ width: "100%", height: "100%" }}>
                <Link to={`/Kambaz/Courses/${course.id}/Home`}
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src={course.image} width="100%" height={160} />
                <Card.Body style={{ borderBottom: "none" }}>
                <Card.Title className="wd-dashboard-course-title">{course.title}</Card.Title>
                <Card.Text className="wd-dashboard-course-description">{course.description}</Card.Text>
                </Card.Body>
                </Link>
                <Card.Footer style={{ backgroundColor: "white", display: "flex", border: "none" }}>
                <Button variant="primary" className="w-20" style={{ border: "none" }}>Go</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
};
