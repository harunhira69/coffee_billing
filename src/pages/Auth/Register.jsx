import React, { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../App.css";
import { AuthContext } from "../../Context/AuthContext";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
} from "../../utils/validation";
import {
  getFirebaseErrorMessage,
  authMessages,
} from "../../utils/firebaseErrors";

const Register = () => {
  const { register, googleLogin, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const passwordStrength = getPasswordStrength(password);

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
    }

    const passwordValidation = validatePassword(password);
    if (!password) {
      errors.password = "Password is required";
    } else if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(", ");
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (!validateConfirmPassword(password, confirmPassword)) {
      errors.confirmPassword = "Passwords do not match";
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
      await register(name, email, password);
      toast.success(authMessages.success.register);
      navigate("/");
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
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
        <h2>Register</h2>

        <div className="auth-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            placeholder="Enter your name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={fieldErrors.name ? "input-error" : ""}
          />
          {fieldErrors.name && (
            <span id="name-error" className="field-error" aria-live="polite">
              {fieldErrors.name}
            </span>
          )}
        </div>

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
              placeholder="Create a password"
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
          {password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className={`strength-fill ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.percent}%` }}
                ></div>
              </div>
              <span className="strength-label">{passwordStrength.label}</span>
            </div>
          )}
          {fieldErrors.password && (
            <span id="password-error" className="field-error" aria-live="polite">
              {fieldErrors.password}
            </span>
          )}
        </div>

        <div className="auth-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-wrapper">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearFieldError("confirmPassword");
              }}
              placeholder="Confirm your password"
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? "confirm-error" : undefined}
              className={fieldErrors.confirmPassword ? "input-error" : ""}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <span id="confirm-error" className="field-error" aria-live="polite">
              {fieldErrors.confirmPassword}
            </span>
          )}
        </div>

        <button className="auth-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Register"
          )}
        </button>

        <button
          type="button"
          className="auth-btn google-btn"
          style={{ marginTop: 10 }}
          onClick={handleGoogleSignup}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Sign up with Google"
          )}
        </button>

        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
