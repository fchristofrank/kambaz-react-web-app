import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    setIsEditing(false);
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    const formattedProfile = {
      ...currentUser,
      dob: currentUser.dob ? new Date(currentUser.dob).toISOString().split("T")[0] : "",
    };
    setProfile(formattedProfile);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen container mt-5 p-4 shadow-lg rounded bg-light">
      <h3 className="text-center mb-4 text-primary">Profile</h3>
      {profile && (
      <div>
        {!isEditing ? (
        <div className="profile-view">
          <div className="mb-3 p-3 border rounded shadow-sm bg-white">
          <h5 className="text-secondary">Username</h5>
          <p className="text-dark">{profile.username}</p>
          </div>
          <div className="mb-3 p-3 border rounded shadow-sm bg-white">
          <h5 className="text-secondary">First Name</h5>
          <p className="text-dark">{profile.firstName}</p>
          </div>
          <div className="mb-3 p-3 border rounded shadow-sm bg-white">
          <h5 className="text-secondary">Last Name</h5>
          <p className="text-dark">{profile.lastName}</p>
          </div>
          <div className="mb-3 p-3 border rounded shadow-sm bg-white">
          <h5 className="text-secondary">Email</h5>
          <p className="text-dark">{profile.email}</p>
          </div>
          <div className="mb-3 p-3 border rounded shadow-sm bg-white">
          <h5 className="text-secondary">Date of Birth</h5>
          <p className="text-dark">{profile.dob}</p>
          </div>
          <div className="mb-3 p-3 border rounded shadow-sm bg-white">
          <h5 className="text-secondary">Role</h5>
          <p className="text-dark">{profile.role}</p>
          </div>
          <button
          onClick={() => setIsEditing(true)}
          className="btn btn-primary w-100 mb-3"
          >
          Edit Profile
          </button>
          <button
          onClick={signout}
          className="btn btn-danger w-100"
          id="wd-signout-btn"
          >
          Sign Out
          </button>
        </div>
        ) : (
        <div className="profile-edit">
          <div className="mb-3">
          <label htmlFor="wd-username" className="form-label text-secondary">
            Username
          </label>
          <input
            defaultValue={profile.username}
            id="wd-username"
            className="form-control"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="Username"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="wd-password" className="form-label text-secondary">
            Password
          </label>
          <input
            defaultValue={profile.password}
            id="wd-password"
            className="form-control"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="Password"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="wd-firstname" className="form-label text-secondary">
            First Name
          </label>
          <input
            defaultValue={profile.firstName}
            id="wd-firstname"
            className="form-control"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First Name"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="wd-lastname" className="form-label text-secondary">
            Last Name
          </label>
          <input
            defaultValue={profile.lastName}
            id="wd-lastname"
            className="form-control"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last Name"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="wd-dob" className="form-label text-secondary">
            Date of Birth
          </label>
          <input
            defaultValue={profile.dob}
            id="wd-dob"
            className="form-control"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
            placeholder="Date of Birth"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="wd-email" className="form-label text-secondary">
            Email
          </label>
          <input
            defaultValue={profile.email}
            id="wd-email"
            className="form-control"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          </div>
          <div className="mb-3">
          <label htmlFor="wd-role" className="form-label text-secondary">
            Role
          </label>
          <select
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control"
            id="wd-role"
            value={profile.role || "USER"}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          </div>
          <button
          onClick={updateProfile}
          className="btn btn-primary w-100 mb-3"
          >
          Save Changes
          </button>
          <button
          onClick={() => setIsEditing(false)}
          className="btn btn-secondary w-100"
          >
          Cancel
          </button>
        </div>
        )}
      </div>
      )}
    </div>
  );
}