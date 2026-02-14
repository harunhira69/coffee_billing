import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../App.css";
import { AuthContext } from "../../Context/AuthContext";
import { validateEmail } from "../../utils/validation";
import {
  getFirebaseErrorMessage,
  authMessages,
} from "../../utils/firebaseErrors";

const Login = () => {
  const { login, googleLogin, resetPassword, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(authMessages.error.emptyFields);
      return;
    }

    setIsSubmitting(true);

    try {
      await login(email, password);
      toast.success(authMessages.success.login);
      navigate("/");
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await googleLogin();
      toast.success(authMessages.success.googleSignIn);
      navigate("/");
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address first");
      setFieldErrors({ email: "Email is required for password reset" });
      return;
    }

    if (!validateEmail(email)) {
      toast.error(authMessages.error.invalidEmail);
      setFieldErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsResetting(true);
    try {
      await resetPassword(email);
      toast.success(authMessages.success.passwordReset);
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err));
    } finally {
      setIsResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-amber-600"></span>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

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
            disabled={isResetting}
          >
            {isResetting ? "Sending..." : "Forgot Password?"}
          </button>
        </div>

        <button className="auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>

        <button
          type="button"
          className="auth-btn google-btn"
          style={{ marginTop: 10 }}
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Continue with Google"
          )}
        </button>

        <p className="auth-switch">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
