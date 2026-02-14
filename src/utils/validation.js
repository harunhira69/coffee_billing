export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push("At least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("At least 1 uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("At least 1 lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("At least 1 number");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("At least 1 special character");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
  if (strength <= 2) return { label: "Weak", color: "bg-red-500", percent: 33 };
  if (strength <= 4) return { label: "Medium", color: "bg-yellow-500", percent: 66 };
  return { label: "Strong", color: "bg-green-500", percent: 100 };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
