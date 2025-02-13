import { NavLink } from "react-router-dom";
import "./Signin.css";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <div className="side-bar"><NavLink to={`/Kambaz/Account/Signin`} className={({ isActive }) => isActive ? "active-link" : undefined}> Signin </NavLink></div>
      <div className="side-bar"><NavLink to={`/Kambaz/Account/Signup`} className={({ isActive }) => isActive ? "active-link" : undefined}> Signup </NavLink></div>
      <div className="side-bar"><NavLink to={`/Kambaz/Account/Profile`} className={({ isActive }) => isActive ? "active-link" : undefined}> Profile </NavLink></div>
    </div>
);}

