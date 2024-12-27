import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Firebase"; // Import Firestore
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState(""); // New state for username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
      });

      navigate("/home"); // Redirect to home on successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Save Google user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName || "Google User",
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      navigate("/home"); // Redirect to home
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Join Us</h1>
        <p>Create an account to get started</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="google-signin">
          <p>or</p>
          <button onClick={handleGoogleSignIn}>Sign up with Google</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
