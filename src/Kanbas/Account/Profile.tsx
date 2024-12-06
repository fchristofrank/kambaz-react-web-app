import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    const formattedProfile = {
      ...currentUser,
      dob: currentUser.dob ? new Date(currentUser.dob).toISOString().split("T")[0] : ""
    };
    setProfile(formattedProfile);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <input defaultValue={profile.username} id="wd-username" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} placeholder="username" />
          <input defaultValue={profile.password} id="wd-password" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} placeholder="password" />
          <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} placeholder="First Name" />
          <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Last Name" />
          <input defaultValue={profile.dob} id="wd-dob" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" placeholder="DOB" />
          <input defaultValue={profile.email} id="wd-email" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="email" />
          <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2" id="wd-role"
            value={profile.role || "USER"}>
            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
          </select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </button>
        </div>
      )}
    </div>);
}