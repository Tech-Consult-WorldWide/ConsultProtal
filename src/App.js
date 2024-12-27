import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/user/Login.tsx';
import HomePage from './pages/user/HomePage.tsx';
import SignUp from './pages/user/SignUp.tsx';

import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile.tsx';
import Settings from './pages/user/Settings';


function App() {
  return (
<div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
