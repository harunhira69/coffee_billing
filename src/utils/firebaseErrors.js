const firebaseErrorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/user-not-found": "No account found with this email.",
  "auth/too-many-requests": "Too many attempts. Please wait and try again.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/weak-password": "Password is too weak. Please use a stronger password.",
  "auth/invalid-credential": "Invalid credentials. Please check your email and password.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/operation-not-allowed": "This operation is not allowed.",
  "auth/popup-closed-by-user": "Sign-in popup was closed before completing.",
  "auth/cancelled-popup-request": "Sign-in was cancelled.",
  "auth/popup-blocked": "Sign-in popup was blocked by the browser.",
};

export const getFirebaseErrorMessage = (error) => {
  const errorCode = error?.code || "";
  return firebaseErrorMessages[errorCode] || "Something went wrong. Please try again.";
};

export const authMessages = {
  success: {
    register: "Account created successfully. Welcome aboard!",
    login: "Login successful. Welcome back!",
    googleSignIn: "Signed in with Google successfully.",
    logout: "You have been logged out successfully.",
    passwordReset: "Password reset email sent. Please check your inbox.",
  },
  error: {
    emptyFields: "Please fill in all required fields.",
    weakPassword: "Password must meet the required security rules.",
    passwordMismatch: "Passwords do not match.",
    invalidEmail: "Please enter a valid email address.",
  },
};
