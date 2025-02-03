import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";

export default function Account() {
  return (
    <div id="wd-account-screen" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Account Navigation will be hidden on smaller screens */}
        <div className="d-none d-md-block col-md-2">
          <AccountNavigation />
        </div>

        <div style={{ flex: 1 }}>
          <h2>Account</h2>
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}