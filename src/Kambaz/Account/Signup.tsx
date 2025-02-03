import { Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

export default function Signup() {
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
            <h3 className="mb-3">Sign up</h3>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" className="wd-username" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" className="wd-password" />
                </Form.Group>

                <Button variant="primary" className="w-100" onClick={() => window.location.href = "/Kambaz/Account/Profile"}>
                    Sign up
                </Button>
            </Form>

            <div className="text-center mt-3">
                <Link to="/Kambaz/Account/Signin" className="text-decoration-none">Sign in</Link>
            </div>
        </Container>
    );
}
