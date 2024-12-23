import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Please sign in to continue</p>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
