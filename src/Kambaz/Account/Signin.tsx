import { Link } from "react-router-dom";
import "./Signin.css";
import { Container } from "react-bootstrap";

export default function Signin() {
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
      
      <div className="signin-form">
        <h2>Signin</h2>
        <input placeholder="username" className="input-field" /> <br />
        <input placeholder="password" type="password" className="input-field" /> <br />
        <button className="signin-btn">Signin</button> <br />
        <Link to="/Kambaz/Account/Signup" className="bottom-link">Signup</Link>
      </div>
    </Container>
  );
}
