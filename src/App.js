import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/user/Login.tsx';
import HomePage from './pages/user/HomePage.tsx';
import SignUp from './pages/user/SignUp.tsx';

import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile.tsx';
import Settings from './pages/user/Settings';
import ClientDashboard from './pages/user/client/ClientDashboard';
import BookAppointmentPage from './pages/user/BookAppointment.tsx';

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
        <Route path="/book-appointment/:expertId" element={<BookAppointmentPage />} />
      </Routes>
    </Router>
</div>
  );
}

export default App;
