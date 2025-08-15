import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import ChatIA from './pages/ChatBot';
import Config from './pages/Config';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/chatia' element={<ChatIA />} />
        <Route path='/config' element={<Config />} />
      </Routes>
    </Router>
  );
}

export default App;