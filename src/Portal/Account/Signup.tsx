import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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

  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignup = async () => {
    try {
      // Set loading state
      setIsLoading(true);
      setError(null);
      
      // Step 2: Prepare credentials for signin
      const credentials = {
        username: formData.username,
        password: formData.password
      };
      
      // Step 3: Perform signin to get authentication token
      const user = await client.signin(credentials);
      
      // Step 4: Store auth data in localStorage
      localStorage.setItem('userToken', user.token);
      localStorage.setItem('userId', user._id);
      
      // Step 5: Update Redux state
      dispatch(setCurrentUser(user));
      
      // Step 6: Navigate to home page
      navigate("/Portal/home");
    } catch (error) {
      console.error("Authentication failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validation functions
  const validateStep1 = () => formData.username && formData.password;
  const validateStep2 = () => formData.name;
  const validateStep3 = () => true; // Optional fields in step 3

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
        
        {/* Progress indicator */}
        <div className="progress mb-3">
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ width: `${(step / 3) * 100}%` }} 
            aria-valuenow={(step / 3) * 100} 
            aria-valuemin={0} 
            aria-valuemax={100}>
            Step {step} of 3
          </div>
        </div>
        
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}
        
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <button 
              onClick={handleNext} 
              className="btn btn-primary w-100 mb-3 fw-bold"
              disabled={!validateStep1() || isLoading}
            >
              Next
            </button>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button 
                onClick={handleBack} 
                className="btn btn-secondary fw-bold"
                disabled={isLoading}
              >
                Back
              </button>
              <button 
                onClick={handleNext} 
                className="btn btn-primary fw-bold"
                disabled={!validateStep2() || isLoading}
              >
                Next
              </button>
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button 
                onClick={handleBack} 
                className="btn btn-secondary fw-bold"
                disabled={isLoading}
              >
                Back
              </button>
              <button 
                onClick={handleSignup} 
                className="btn btn-primary fw-bold wd-signup-btn"
                disabled={!validateStep3() || isLoading}
              >
                {isLoading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </>
        )}
        
        <div className="text-center mt-3">
          <span className="fw-bold">Already have an account? </span>
          <Link to="/Portal/Account/Signin" className="text-decoration-none fw-bold wd-signin-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}