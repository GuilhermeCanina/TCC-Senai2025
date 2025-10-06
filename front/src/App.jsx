import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import ChatIA from './pages/ChatBot';
import Config from './pages/Config';
import LandingPage from './pages/LandingPage';
import IniciarEstudo from './pages/IniciarEstudo';
import Relatorio from './pages/Relatorio';
import Medalhas from './pages/Medalhas';
import Redacao from './pages/Redacao';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/chatia' element={<ChatIA />} />
        <Route path='/config' element={<Config />} />
        <Route path="/sessao" element={<IniciarEstudo />} />
        <Route path="/relatorios" element={<Relatorio />} />
        <Route path="/medalhas" element={<Medalhas />} />
        <Route path="/redacao" element={<Redacao />} />
        <Route path="*" element={<h1>Você está em águas desconhecidas</h1>} />
      </Routes>
    </Router>
  );
}

export default App;