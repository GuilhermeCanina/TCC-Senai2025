import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import ChatBox from './ChatBot'; // Importando o componente ChatBoxs
import axios from 'axios';
import { FiHome, FiBook, FiBarChart2, FiMessageSquare, FiAward, FiSettings, FiLogOut } from 'react-icons/fi';

function Dashboard() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:3001/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setNomeUsuario(res.data.nome);
        setUserInitial(res.data.nome.charAt(0).toUpperCase());
        if (res.data.avatarurl) setAvatar(res.data.avatarurl);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">E</div>
          <h2>EstudaFácil</h2>
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div className="user-avatar">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                style={{ width: 60, height: 60, borderRadius: '50%' }}
              />
            ) : (
              <div className="user-initial">{userInitial}</div>
            )}
          </div>
          <div className="user-info">
            <h3>{nomeUsuario || 'Usuário'}</h3>
            <p>Premium Member</p>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li className="menu-item">
            <a href="#home" className="active">
              <FiHome className="menu-icon" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#sessao">
              <FiBook className="menu-icon" />
              <span>Sessões</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#relatorios">
              <FiBarChart2 className="menu-icon" />
              <span>Relatórios</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#chat">
              <FiMessageSquare className="menu-icon" />
              <span>Chat IA</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="#medalhas">
              <FiAward className="menu-icon" />
              <span>Medalhas</span>
            </a>
          </li>
          <li className="menu-item">
            <a href="/config">
              <FiSettings className="menu-icon" />
              <span>Configurações</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>Bem-vindo, {nomeUsuario || 'usuário'}!</h1>
            <p>Seu desempenho está melhorando a cada dia!</p>
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tempo de Estudo Hoje</h3>
              <div className="card-icon">
                <FiBook />
              </div>
            </div>
            <div className="card-body">
              <p>2h 45min</p>
              <small>+15% em relação a ontem</small>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Sessões Concluídas</h3>
              <div className="card-icon">
                <FiAward />
              </div>
            </div>
            <div className="card-body">
              <p>24 sessões</p>
              <small>Meta semanal: 30 sessões</small>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Desempenho Geral</h3>
              <div className="card-icon">
                <FiBarChart2 />
              </div>
            </div>
            <div className="card-body">
              <p>87% de eficiência</p>
              <small>Continue assim!</small>
            </div>
          </div>
        </div>

        <div className="dashboard-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/sessao')}
          >
            <FiBook /> Iniciar Sessão de Estudo
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/relatorios')}
          >
            <FiBarChart2 /> Ver Relatórios
          </button>

          <button
            className="btn btn-success"
            onClick={() => navigate('/chat-ia')}
          >
            <FiMessageSquare /> Chat com IA
          </button>

          <button
            className="btn btn-warning"
            onClick={() => navigate('/medalhas')}
          >
            <FiAward /> Minhas Medalhas
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            <FiLogOut /> Sair
          </button>
        </div>
        <section id="chat">
    <h2>Chat com IA</h2>
    <ChatBox />
    </section>
      </main>
    </div>
  );
}

export default Dashboard;
