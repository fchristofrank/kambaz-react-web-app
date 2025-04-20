import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      localStorage.setItem('userToken', user.token);
      dispatch(setCurrentUser(user));
      navigate("/Portal/home");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Incorrect username or password.");
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      id="wd-signin-screen"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "100%",
        background: "#f0f0f0",
        color: "#333",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", fontWeight: "600" }}>
        Welcome Back!
      </h1>
      <p style={{ marginBottom: "2rem", fontSize: "1.2rem", textAlign: "center" }}>
        Sign in to continue to your dashboard
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          id="wd-username"
          placeholder="Username"
          className="form-control mb-3"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1.5rem",
          }}
        />
        <input
          defaultValue={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          id="wd-password"
          placeholder="Password"
          type="password"
          className="form-control mb-3"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "2rem",
          }}
        />
        <button
          onClick={signin}
          id="wd-signin-btn"
          className="btn btn-primary w-100"
          style={{
            background: "#0078d4",
            border: "none",
            padding: "0.75rem",
            fontSize: "1rem",
            fontWeight: "600",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#005a9e")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#0078d4")
          }
        >
          Sign in
        </button>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            id="wd-signup-link"
            to="/Portal/Account/Signup"
            style={{
              color: "#0078d4",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
