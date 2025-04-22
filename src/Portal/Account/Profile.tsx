import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [connections, setConnections] = useState<any[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    setIsEditing(false);
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Portal/Account/Signin");
    const formattedProfile = {
      ...currentUser,
      dob: currentUser.dob ? new Date(currentUser.dob).toISOString().split("T")[0] : "",
    };
    setProfile(formattedProfile);
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    localStorage.setItem('userToken', '');
    navigate("/Portal/Account/Signin");
  };

  // Add a function to fetch connection details
  const fetchConnections = async () => {
    const newProfile = await client.findUserById(profile._id);
    setConnections(newProfile.connections || []);

    if (!profile || !profile.connections || !Array.isArray(profile.connections)) {
      setConnections([]);
      return;
    }

    try {
      // Create an array of promises for all connection fetches
      const connectionPromises = profile.connections.map((connectionId: string) => {
        console.log("Fetching connection ID:", connectionId);
        return client.findUserById(connectionId)
          .catch(error => {
        console.error(`Error fetching connection ${connectionId}:`, error);
        return null;
          });
      });

      // Wait for all promises to resolve
      const results = await Promise.all(connectionPromises);

      // Filter out any null results (failed fetches)
      const validConnections = results.filter(connection => connection !== null);
      console.log("Fetched connections:", validConnections);
      setConnections(validConnections);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setConnections([]);
    }
  };


  // Remove fetchConnections() from the initial useEffect
  useEffect(() => {
    fetchProfile();
  }, []);

  // Add a new useEffect that watches for profile changes
  useEffect(() => {
    if (profile && profile._id) {
      console.log("Profile loaded, fetching connections:", profile);
      fetchConnections();
    }
  }, [profile._id]);

  const activityData = [
    { name: "Week 1", usage: 20, jobs: 5, likes: 10 },
    { name: "Week 2", usage: 30, jobs: 8, likes: 15 },
    { name: "Week 3", usage: 25, jobs: 6, likes: 12 },
    { name: "Week 4", usage: 35, jobs: 10, likes: 20 },
  ];

  const interactionData = [
    { name: "Likes", value: 400 },
    { name: "Comments", value: 300 },
    { name: "Shares", value: 200 },
  ];

  return (
    <div className="wd-profile-screen container mt-5 p-4 shadow-lg rounded bg-light">
      <h3 className="text-center mb-4 text-primary">Profile</h3>
      <div className="d-flex flex-wrap">
        {/* First Column: Profile Details */}
        <div className="flex-grow-1 me-3">
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

                  <div className="mb-3 p-3 border rounded shadow-sm bg-white">
                    <h5 className="text-secondary">Current Organization</h5>
                    <p className="text-dark">{profile.organization || "N/A"}</p>
                  </div>
                  <div className="mb-3 p-3 border rounded shadow-sm bg-white">
                    <h5 className="text-secondary">Years of Experience</h5>
                    <p className="text-dark">{profile.experience || "N/A"}</p>
                  </div>
                  <div className="mb-3 p-3 border rounded shadow-sm bg-white">
                    <h5 className="text-secondary">Title</h5>
                    <p className="text-dark">{profile.title || "N/A"}</p>
                  </div>
                  <div className="mb-3 p-3 border rounded shadow-sm bg-white">
                    <h5 className="text-secondary">Skills</h5>
                    <ul className="text-dark">
                      {profile.skills && profile.skills.length > 0 ? (
                        profile.skills.map((skill: string, index: number) => (
                          <li key={index}>{skill}</li>
                        ))
                      ) : (
                        <li>N/A</li>
                      )}
                    </ul>
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
                    <label className="form-label text-secondary">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={profile.dob}
                      onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Current Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profile.organization || ""}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Years of Experience</label>
                    <input
                      type="number"
                      className="form-control"
                      value={profile.experience || ""}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profile.title || ""}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-secondary">Skills</label>
                    <textarea
                      className="form-control"
                      value={profile.skills ? profile.skills.join(", ") : ""}
                      onChange={(e) =>
                        setProfile({ ...profile, skills: e.target.value.split(",").map((skill) => skill.trim()) })
                      }
                    />
                  </div>
                  <button onClick={updateProfile} className="btn btn-success w-100 mb-3">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)} className="btn btn-secondary w-100">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Second Column: Enhanced Metrics and Charts */}
        <div className="flex-grow-1">
          <h4 className="text-center text-secondary mb-4">Your Enhanced Metrics</h4>
          <div className="p-3 border rounded shadow-sm bg-white">
            <h5 className="text-secondary">Weekly Activity</h5>
            <div className="chart-container">
              <BarChart
                width={450}
                height={300}
                data={activityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" tick={{ fill: "#555" }} />
                <YAxis tick={{ fill: "#555" }} />
                <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }} />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
                <Bar dataKey="usage" fill="#4caf50" radius={[10, 10, 0, 0]} />
                <Bar dataKey="jobs" fill="#2196f3" radius={[10, 10, 0, 0]} />
                <Bar dataKey="likes" fill="#ff9800" radius={[10, 10, 0, 0]} />
              </BarChart>
            </div>
          </div>
          <div className="p-3 border rounded shadow-sm bg-white mt-4">
            <h5 className="text-secondary">Post Interactions</h5>
            <div className="chart-container">
              <PieChart width={450} height={300}>
                <Pie
                  data={interactionData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  animationDuration={800}
                />
                <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }} />
              </PieChart>
            </div>
          </div>
          <div className="p-3 border rounded shadow-sm bg-white mt-4">
            <h5 className="text-secondary">Engagement Over Time</h5>
            <div className="chart-container">
              <BarChart
                width={450}
                height={300}
                data={activityData.map((item) => ({
                  ...item,
                  engagement: item.likes + item.jobs,
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" tick={{ fill: "#555" }} />
                <YAxis tick={{ fill: "#555" }} />
                <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }} />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
                <Bar dataKey="engagement" fill="#673ab7" radius={[10, 10, 0, 0]} />
              </BarChart>
            </div>
          </div>
          <div className="p-3 border rounded shadow-sm bg-white mt-4">
            <h5 className="text-secondary">Last Activity</h5>
            <p className="text-dark">Last active on: {profile.lastActivity || "N/A"}</p>
          </div>
        </div>
      </div>
      {/* Add this after the Skills section in the view mode */}
      <div className="mb-3 p-3 border rounded shadow-sm bg-white">
        <h5 className="text-secondary">Connections</h5>
        <div className="d-flex flex-wrap gap-2">
          {connections && connections.length > 0 ? (
            connections.map((connection, index) => (
              <div
                key={connection._id || index}
                className="card p-2 bg-light"
                style={{ width: "120px", cursor: "pointer" }}
                onClick={() => navigate(`/portal/profile/${connection._id}`)}
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-2"
                  style={{ width: "50px", height: "50px" }}
                >
                  {connection.firstName ? connection.firstName.charAt(0).toUpperCase() : '?'}
                </div>
                <p className="text-center mb-0">{connection.firstName || 'Unknown'}</p>
              </div>
            ))
          ) : (
            <p className="text-muted">No connections available</p>
          )}
        </div>
      </div>
    </div>
  );
}