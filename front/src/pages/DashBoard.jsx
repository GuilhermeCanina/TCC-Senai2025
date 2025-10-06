import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import ChatBox from './ChatBot';
import axios from 'axios';
import { FiHome, FiBook, FiBarChart2, FiAward, FiSettings, FiLogOut } from 'react-icons/fi';

function Dashboard() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [userInitial, setUserInitial] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const [stats, setStats] = useState({
    tempoHoje: '0h 0min',
    variacaoOntem: '+0% em relação a ontem',
    sessoes: 0,
    metaSemanal: 30,
    desempenho: 0,
    mensagem: 'Continue assim!'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('https://api-tcc-senai2025.vercel.app/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setNomeUsuario(res.data.nome);
        setUserInitial(res.data.nome.charAt(0).toUpperCase());
        if (res.data.avatarurl) setAvatar(res.data.avatarurl);
      })
      .catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });

    const fetchStats = async () => {
      try {
        const sessoesRes = await axios.get('https://api-tcc-senai2025.vercel.app/sessoes/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const sessoes = sessoesRes.data;
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const sessoesHoje = sessoes.filter(s => new Date(s.data) >= hoje);
        const tempoHojeMin = sessoesHoje.reduce((acc, s) => acc + s.duracao, 0);
        const horas = Math.floor(tempoHojeMin / 60);
        const minutos = tempoHojeMin % 60;

        const respostasRes = await axios.get(`https://api-tcc-senai2025.vercel.app/respostas/${sessoes[0]?.usuarioId || 1}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const respostas = respostasRes.data.respostas || []; 
        const total = respostas.length;
        const corretas = respostas.filter(r => r.correta).length;
        const desempenho = total > 0 ? Math.round((corretas / total) * 100) : 0;

        setStats({
          tempoHoje: `${horas}h ${minutos}min`,
          variacaoOntem: '+15% em relação a ontem',
          sessoes: sessoes.length,
          metaSemanal: 30,
          desempenho,
          mensagem: 'Continue assim!'
        });
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">S</div>
          <h2>SynapLearn</h2>
        </div>

        <div className="user-profile">
          <div onClick={() => navigate('/config')} style={{ cursor: 'pointer' }}>
            <div className="user-avatar">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  style={{ width: 100, height: 100, borderRadius: '50%' }}
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
        </div>

        <ul className="sidebar-menu">
          <li className="menu-item">
            <div
              onClick={() => navigate('/dashboard')}
              className="active"
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1rem',
              }}
            >
              <FiHome className="menu-icon" />
              <span>Dashboard</span>
            </div>
          </li>
          <li className="menu-item">
            <div
              onClick={() => navigate('/sessao')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1rem',
              }}
            >
              <FiBook className="menu-icon" />
              <span>Sessões</span>
            </div>
          </li>
          <li className="menu-item">
            <div
              onClick={() => navigate('/relatorios')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1rem',
              }}
            >
              <FiBarChart2 className="menu-icon" />
              <span>Relatórios</span>
            </div>
          </li>
          <li className="menu-item">
            <div
              onClick={() => navigate('/medalhas')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1rem',
              }}
            >
              <FiAward className="menu-icon" />
              <span>Medalhas</span>
            </div>
          </li>
          <li className="menu-item">
            <div
              onClick={() => navigate('/config')}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem 1rem',
              }}
            >
              <FiSettings className="menu-icon" />
              <span>Configurações</span>
            </div>
          </li>
        </ul>
      </div>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>Bem-vindo, {nomeUsuario || 'usuário'}!</h1>
            <p>Você está arrasando hoje!</p>
          </div>
        </header>

        <div className="dashboard-cards">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tempo de Estudo Hoje</h3>
              <div className="card-icon"><FiBook /></div>
            </div>
            <div className="card-body">
              <p>{stats.tempoHoje}</p>
              <small>{stats.variacaoOntem}</small>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Sessões Concluídas</h3>
              <div className="card-icon"><FiAward /></div>
            </div>
            <div className="card-body">
              <p>{stats.sessoes} sessões</p>
              <small>Meta semanal: {stats.metaSemanal} sessões</small>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Desempenho Geral</h3>
              <div className="card-icon"><FiBarChart2 /></div>
            </div>
            <div className="card-body">
              <p>{stats.desempenho}% de eficiência</p>
              <small>{stats.mensagem}</small>
            </div>
          </div>
        </div>

        <div className="dashboard-buttons">
          <button className="btn btn-cta" onClick={() => navigate('/sessao')}>
            <FiBook /> Iniciar Sessão de Estudo
          </button>

          <button className="btn btn-secondary" onClick={() => navigate('/relatorios')}>
            <FiBarChart2 /> Ver Relatórios
          </button>

          <button className="btn btn-warning" onClick={() => navigate('/medalhas')}>
            <FiAward /> Minhas Medalhas
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            <FiLogOut /> Sair
          </button>
        </div>
      </main>

      <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)}>💬</button>
      <div className={`chat-window ${chatOpen ? 'active' : ''}`}>
        <ChatBox />
      </div>
    </div>
  );
}

export default Dashboard;
