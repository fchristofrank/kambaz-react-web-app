import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
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
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input defaultValue={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} id="wd-username" placeholder="username" className="form-control mb-2" />
      <input defaultValue={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} id="wd-password" placeholder="password" type="password" className="form-control mb-2" />
      <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
      <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
    </div>
  );
}
