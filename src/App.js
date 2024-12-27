import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/user/Login';
import HomePage from './pages/user/HomePage';
import SignUp from './pages/user/SignUp';
import app from './Firebase'

import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import ClientDashboard from './pages/user/client/ClientDashboard';

function App() {
  return (
<div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clientdashboard" element={<ClientDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
</div>
  );
}

export default App;
