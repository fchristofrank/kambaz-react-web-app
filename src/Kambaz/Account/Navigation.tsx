import { Link } from "react-router-dom";
import "./Signin.css";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <Link to={`/Kambaz/Account/Signin`}  > Signin  </Link>
      <Link to={`/Kambaz/Account/Signup`}  > Signup  </Link>
      <Link to={`/Kambaz/Account/Profile`} > Profile </Link>
    </div>
);}

