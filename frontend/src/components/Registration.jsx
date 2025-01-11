import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const [studentname, setStudentname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Default role is student

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function register(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/student/save", {
        studentname,
        email,
        password,
        role, // Send role to backend
      });

      if (response.data) {
        alert("Registration successful!");
      }
    } catch (err) {
      console.error(err);
      setError("Error during registration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <h2 className="registration-header">Register</h2>
        <form onSubmit={register} className="registration-form">
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              className="form-control"
              value={studentname}
              onChange={(e) => setStudentname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="registration-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="registration-footer">
          <Link to="/">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
