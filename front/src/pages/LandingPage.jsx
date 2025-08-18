import React from "react";
import "../styles/LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faCogs, faRocket } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="landing-header">
        <div className="logo">SynapLearn</div>
        <nav className="nav-links">
          <a href="#features">Funcionalidades</a>
          <a href="#about">Sobre</a>
          <a href="login" className="btn btn-primary">Entrar</a>
        </nav>
      </header>


      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Organize seus estudos com facilidade</h1>
          <p>Monte sessões personalizadas, acompanhe seu progresso e alcance seus objetivos mais rápido.</p>
          <div className="hero-buttons">
            <a href="/register" className="btn btn-secondary">Começar agora</a>
            <a href="#features" className="btn btn-light">Saiba mais</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/study.png" alt="Ilustração estudo" />
        </div>
      </section>

        {/* como funciona */}
        <section id="how-it-works" className="how-it-works">
        <h2>Seu plano de estudos em 3 passos simples</h2>
        <div className="steps-container">
          <div className="step-card">
            <FontAwesomeIcon icon={faUserPlus} size="3x" className="step-icon"/>
            <h3>1. Cadastre-se</h3>
            <p>Crie sua conta gratuitamente em menos de um minuto e defina suas metas de estudo.</p>
          </div>
          <div className="step-card">
            <FontAwesomeIcon icon={faCogs} size="3x" className="step-icon"/>
            <h3>2. Personalize</h3>
            <p>Monte simulados e listas de exercícios focados nas matérias que você mais precisa.</p>
          </div>
          <div className="step-card">
            <FontAwesomeIcon icon={faRocket} size="3x" className="step-icon"/>
            <h3>3. Evolua</h3>
            <p>Acompanhe seu desempenho com gráficos detalhados e veja sua nota decolar.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Por que usar?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-book"></i>
            <h3>Questões do ENEM</h3>
            <p>Acesse questões de anos anteriores organizadas por matéria.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Relatórios inteligentes</h3>
            <p>Acompanhe seus acertos, erros e evolução ao longo do tempo.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-bullseye"></i>
            <h3>Estudo direcionado</h3>
            <p>Foque nos temas onde você mais precisa melhorar.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>Sobre Nós</h2>
        <p>Somos uma plataforma dedicada a ajudar estudantes a alcançarem seus objetivos acadêmicos por meio de ferramentas de estudo personalizadas.</p>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} MeuSite - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
