import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./../../Firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show a loading state
    setError(""); // Clear any previous errors
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home on successful login
    } catch (error) {
      const errorMessage = handleFirebaseError(error.code);
      console.log(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/home"); // Redirect to home on successful Google sign-in
    } catch (error) {
      const errorMessage = handleFirebaseError(error.code);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Invalid Credential";
      case "auth/network-request-failed":
        return "Network error. Please try again.";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup was closed.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Please sign in to continue</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="google-signin">
          <p>or</p>
          <button onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
