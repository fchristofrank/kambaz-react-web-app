import { Link } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import "./Profile.css";

export default function Profile() {
  return (
    <Container
      id="wd-signup-screen"
      className="mt-5"
      style={{
        maxWidth: "350px",
        marginLeft: "0", // Left-aligns the container
        marginRight: "auto", // Keeps right margin auto
      }}
    >
      <h3>Profile</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            defaultValue="alice"
            placeholder="Username"
            className="wd-username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            defaultValue="123"
            placeholder="Password"
            type="password"
            className="wd-password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            defaultValue="Alice"
            placeholder="First Name"
            id="wd-firstname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            defaultValue="Wonderland"
            placeholder="Last Name"
            id="wd-lastname"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            defaultValue="2000-01-01"
            type="date"
            id="wd-dob"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            defaultValue="alice@wonderland"
            type="email"
            id="wd-email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control as="select" defaultValue="FACULTY" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Control>
        </Form.Group>

        <Button type="button" variant="danger" className="w-100">
          <Link to="/Kambaz/Account/Signin" className="btn btn-primary w-100 btn-danger">Sign out</Link>
        </Button>
      </Form>
    </Container>
  );
}
