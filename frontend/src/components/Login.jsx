import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Ensure you have the CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError(""); // Clear any existing error messages

    try {
      const response = await axios.post(
        "http://localhost:8080/student/login", // Login endpoint
        { email, password }
      );

      console.log("API Response:", response.data); // Debug log
      const { message, role, studentname, studentid, token } = response.data;
      
      if (message === "Email not exist") {
        alert("Email does not exist");
      } else if (message === "Login success") {
        // Store token and other user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("studentName", studentname);
        localStorage.setItem("studentid", studentid);

        console.log("Stored Token in LocalStorage:", localStorage.getItem("token"));
        console.log("Stored Name in LocalStorage:", localStorage.getItem("studentName")); 

        // Navigate to role-based dashboards
        if (role === "student") {
          navigate("/student-dashboard");
        } else if (role === "instructor") {
          navigate("/instructor-dashboard");
        } else if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          alert("Role not recognized. Please contact support.");
        }
      } else {
        alert("Incorrect email or password.");
      }
    } catch (err) {
      console.error("Login error: ", err);

      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Invalid email or password.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  }

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <h2 className="text-center">Welcome Back!</h2>
          <form onSubmit={login}>
            <div className="form-group">
              <label>Enter Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Enter Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/Registration" className="register-link">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
