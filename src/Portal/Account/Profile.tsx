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

  const fetchConnections = async () => {
    const newProfile = await client.findUserById(profile._id);
    setConnections(newProfile.connections || []);

    if (!profile || !profile.connections || !Array.isArray(profile.connections)) {
      setConnections([]);
      return;
    }

    try {
      const connectionPromises = profile.connections.map((connectionId: string) => {
        console.log("Fetching connection ID:", connectionId);
        return client.findUserById(connectionId)
          .catch(error => {
        console.error(`Error fetching connection ${connectionId}:`, error);
        return null;
          });
      });

      const results = await Promise.all(connectionPromises);
      const validConnections = results.filter(connection => connection !== null);
      console.log("Fetched connections:", validConnections);
      setConnections(validConnections);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setConnections([]);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
      <div className="row">
        {/* Main Profile Section */}
        <div className="col-12 mb-4">
          <h3 className="text-center mb-4 text-primary">User Profile</h3>
          <div className="card shadow-sm">
            <div className="card-body">
              {profile && (
                <div>
                  {!isEditing ? (
                    <div className="profile-view">
                      <div className="row">
                        <div className="col-md-6">
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
                        </div>
                        <div className="col-md-6">
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
                            <ul className="text-dark list-group list-group-flush">
                              {profile.skills && profile.skills.length > 0 ? (
                                profile.skills.map((skill: string, index: number) => (
                                  <li key={index} className="list-group-item bg-transparent">{skill}</li>
                                ))
                              ) : (
                                <li className="list-group-item bg-transparent">N/A</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary w-100 mb-3"
                          >
                            Edit Profile
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            onClick={signout}
                            className="btn btn-danger w-100 mb-3"
                            id="wd-signout-btn"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="profile-edit">
                      <div className="row">
                        <div className="col-md-6">
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
                        </div>
                        <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <button onClick={updateProfile} className="btn btn-success w-100 mb-3">
                            Save Changes
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button onClick={() => setIsEditing(false)} className="btn btn-secondary w-100 mb-3">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Connections Section */}
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="m-0">My Connections</h4>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {connections && connections.length > 0 ? (
                  connections.map((connection, index) => (
                    <div
                      key={connection._id || index}
                      className="card shadow-sm hover-shadow"
                      style={{ width: "140px", cursor: "pointer", transition: "all 0.3s ease" }}
                      onClick={() => navigate(`/portal/profile/${connection._id}`)}
                    >
                      <div className="card-body text-center p-3">
                        <div
                          className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-3"
                          style={{ width: "60px", height: "60px", fontSize: "24px" }}
                        >
                          {connection.firstName ? connection.firstName.charAt(0).toUpperCase() : '?'}
                        </div>
                        <h6 className="mb-0">{connection.firstName || 'Unknown'}</h6>
                        <p className="text-muted small mb-0">{connection.title || 'Developer'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100 py-4">
                    <p className="text-muted mb-0">No connections available</p>
                    <button className="btn btn-outline-primary mt-3">Find Connections</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="m-0">Analytics Dashboard</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="card-title mb-0">Weekly Activity</h5>
                    </div>
                    <div className="card-body">
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
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="card-title mb-0">Post Interactions</h5>
                    </div>
                    <div className="card-body">
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
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="card-title mb-0">Engagement Over Time</h5>
                    </div>
                    <div className="card-body">
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
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header bg-light">
                      <h5 className="card-title mb-0">Account Summary</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body text-center">
                              <h6 className="text-primary">Last Active</h6>
                              <p className="mb-0">{profile.lastActivity || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body text-center">
                              <h6 className="text-primary">Connections</h6>
                              <p className="mb-0">{connections?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body text-center">
                              <h6 className="text-primary">Posts</h6>
                              <p className="mb-0">{profile.posts?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="card bg-light">
                            <div className="card-body text-center">
                              <h6 className="text-primary">Skills</h6>
                              <p className="mb-0">{profile.skills?.length || 0}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}