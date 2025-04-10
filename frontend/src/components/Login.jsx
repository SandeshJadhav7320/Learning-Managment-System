import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storeSessionData = (token, name, id, email, role) => {
    localStorage.setItem("authToken", token || "");
    localStorage.setItem("userName", name || "");
    localStorage.setItem("userId", id?.toString() || "");
    localStorage.setItem("userEmail", email || "");
    localStorage.setItem("userRole", role || "");
  };

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/student/login", {
        email,
        password,
      });

      console.log("Full login response:", response.data);

      const { message, role, studentname, studentid, token } = response.data;

      if (!studentid || !studentname) {
        console.error("❌ Missing student ID or name from API response.");
        setError("Missing details in response.");
        return;
      }

      if (message === "Login success") {
        storeSessionData(token, studentname, studentid, email, role);

        console.log("✅ Login successful");
        console.log("Role received:", role);

        switch (role?.toLowerCase()) {
          case "student":
            navigate("/student-dashboard");
            break;
          case "instructor":
            navigate("/instructor-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            console.warn("⚠️ Unknown role:", role);
            setError("Invalid role received. Contact support.");
        }
      } else {
        setError("Incorrect email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized: Invalid email or password.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
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
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
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
  );
}

export default Login;
