import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../App.css";
import { validateEmail } from "../../utils/validation";
import { loginApi } from "./authApi";

// আপনি যদি AuthContext এ user/loading রাখেন, সেটাই use করুন
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { user, loading, setAuth } = useContext(AuthContext);
  // setAuth: ({ user, accessToken }) => context এ store করার জন্য

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) errors.email = "Email is required";
    else if (!validateEmail(email)) errors.email = "Please enter a valid email address";

    if (!password) errors.password = "Password is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await loginApi({ email, password });
      // data: { accessToken, user }

      // ✅ store in context
      setAuth?.({ user: data.user, accessToken: data.accessToken });

      // Optional: remember me -> store access token in localStorage
      if (rememberMe) {
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Firebase google/reset password বাদ দিলে এগুলো disable রাখুন বা remove করুন
  const handleGoogleLogin = () => {
    toast.error("Google login is not enabled in JWT backend yet");
  };

  const handleForgotPassword = () => {
    toast.error("Password reset endpoint not implemented yet");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-amber-600"></span>
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>

        <div className="auth-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            placeholder="Enter your email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={fieldErrors.email ? "input-error" : ""}
          />
          {fieldErrors.email && (
            <span id="email-error" className="field-error" aria-live="polite">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="auth-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              placeholder="Enter your password"
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
              className={fieldErrors.password ? "input-error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {fieldErrors.password && (
            <span id="password-error" className="field-error" aria-live="polite">
              {fieldErrors.password}
            </span>
          )}
        </div>

        <div className="auth-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        <button className="auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
        </button>

        <button
          type="button"
          className="auth-btn google-btn"
          style={{ marginTop: 10 }}
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
