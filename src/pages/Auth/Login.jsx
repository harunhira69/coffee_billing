import React, { useState } from "react";
import "../../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // Call login API here
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="auth-btn" type="submit">Login</button>
        <p className="auth-switch">Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
