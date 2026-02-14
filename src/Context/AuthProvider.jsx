import { useEffect, useState } from "react";

import { auth } from "../pages/Auth/Firebase/firebase.config";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register (Email/Password)
  const register = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (name) {
      await updateProfile(result.user, { displayName: name });
    }

    return result;
  };

  // Login (Email/Password)
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Set persistence for Remember Me
  const setAuthPersistence = async () => {
    return setPersistence(auth, browserLocalPersistence);
  };

  // Observe Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    resetPassword,
    setAuthPersistence,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
