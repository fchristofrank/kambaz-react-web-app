import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
    name: "",
    address: "",
    topics: "",
    age: "",
    dob: "",
    recoveryEmail: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const signup = async () => {
    const currentUser = await client.signup(formData);
    dispatch(setCurrentUser(currentUser));
    navigate("/Portal/Account/Profile");
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
        {step === 1 && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label fw-bold">Username</label>
              <input
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                id="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <button onClick={handleNext} className="btn btn-primary w-100 mb-3 fw-bold">Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label fw-bold">Full Name</label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address" className="form-label fw-bold">Address</label>
              <input
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="topics" className="form-label fw-bold">Topics of Interest</label>
              <input
                id="topics"
                value={formData.topics}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter topics of interest"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button onClick={handleBack} className="btn btn-secondary fw-bold">Back</button>
              <button onClick={handleNext} className="btn btn-primary fw-bold">Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="age" className="form-label fw-bold">Age</label>
              <input
                id="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your age"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="dob" className="form-label fw-bold">Date of Birth</label>
              <input
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="recoveryEmail" className="form-label fw-bold">Recovery Email</label>
              <input
                id="recoveryEmail"
                value={formData.recoveryEmail}
                onChange={handleChange}
                type="email"
                className="form-control"
                placeholder="Enter your recovery email"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneNumber" className="form-label fw-bold">Phone Number</label>
              <input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                className="form-control"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="d-flex justify-content-between">
              <button onClick={handleBack} className="btn btn-secondary fw-bold">Back</button>
              <button onClick={signup} className="btn btn-primary fw-bold">Sign Up</button>
            </div>
          </>
        )}
        {step > 3 && (
          <div className="text-center">
            <span className="fw-bold">Already have an account? </span>
            <Link to="/Portal/Account/Signin" className="text-decoration-none fw-bold">Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
}
