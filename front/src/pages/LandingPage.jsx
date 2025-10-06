import React, { useEffect, useState } from "react";
import "../styles/LandingPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faCogs, faRocket } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    const faqItens = document.querySelectorAll(
      ".faq-item1, .faq-item2, .faq-item3, .faq-item4"
    );

    faqItens.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });

    return () => {
      faqItens.forEach((item) => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
      });
    };
  }, []);

  return (
    <div className={`landing-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="landing-header">
        <div className="logo">SynapLearn</div>
        <nav className="nav-links">
          <a href="#features">Funcionalidades</a>
          <a href="#about">Sobre</a>
          <a href="#FAQ">FAQ</a>
          <a href="login" className="btn btn-primary">Entrar</a>
        </nav>

        <div className="toggle-container">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="ball"></span>
          </label>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Organize seus estudos com facilidade</h1>
          <p>Monte sessões personalizadas, acompanhe seu progresso e alcance seus objetivos mais rápido.</p>
          <div className="hero-buttons">
            <a href="/register" className="btn btn-secondary">Começar agora</a>
            <a href="#features" className="btn btn-light">Saiba mais</a>
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="section-container">
          <h2>O que é o SynapLearn?</h2>
          <p>
            Uma plataforma de estudo digital que combina simulados, relatórios inteligentes e sessões cronometradas
            para ajudar você a se preparar para o ENEM, vestibulares e concursos de forma mais eficiente.
          </p>

          <div className="intro-grid">
            <div className="intro-card">
              <i className="fas fa-stopwatch"></i>
              <h3>Sessões de Estudo</h3>
              <p>Organize seu tempo e aumente sua produtividade.</p>
            </div>
            <div className="intro-card">
              <i className="fas fa-pencil-alt"></i>
              <h3>Simulados</h3>
              <p>Pratique com questões reais e aprimore seu desempenho.</p>
            </div>
            <div className="intro-card">
              <i className="fas fa-chart-bar"></i>
              <h3>Relatórios</h3>
              <p>Acompanhe seu progresso com gráficos detalhados.</p>
            </div>
            <div className="intro-card">
              <i className="fas fa-robot"></i>
              <h3>IA de Apoio</h3>
              <p>Receba dicas e sugestões personalizadas para evoluir.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="section-container">
          <div className="section-badge-oval">
            <h2>Como Funciona?</h2>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <FontAwesomeIcon icon={faUserPlus} size="3x" className="step-icon" />
              <h3>1. Cadastre-se</h3>
              <p>Crie sua conta gratuitamente em menos de um minuto e defina suas metas de estudo.</p>
            </div>
            <div className="step-card">
              <FontAwesomeIcon icon={faCogs} size="3x" className="step-icon" />
              <h3>2. Personalize</h3>
              <p>Monte simulados e listas de exercícios focados nas matérias que você mais precisa.</p>
            </div>
            <div className="step-card">
              <FontAwesomeIcon icon={faRocket} size="3x" className="step-icon" />
              <h3>3. Evolua</h3>
              <p>Acompanhe seu desempenho com gráficos detalhados e veja sua nota decolar.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="section-container">
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
        </div>
      </section>

      <section id="FAQ" className="faq">
        <div className="section-container">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-item1">
            <h3>Como faço para criar uma conta?</h3>
            <p>Clique no botão "Começar agora" e preencha o formulário de registro com suas informações básicas.</p>
          </div>
          <div className="faq-item2">
            <h3>Posso usar a plataforma gratuitamente?</h3>
            <p>Sim! O Site é totalmente gratuito, você pode acessar todas as funcionalidades sem custo, precisa apenas criar sua conta.</p>
          </div>
          <div className="faq-item3">
            <h3>Quais matérias estão disponíveis?</h3>
            <p>Temos questões de todas as matérias do ENEM, incluindo Matemática, Ciências, Linguagens e Humanas.</p>
          </div>
          <div className="faq-item4">
            <h3>Como acompanho meu progresso?</h3>
            <p>Utilize nossos relatórios detalhados para ver seu desempenho em diferentes matérias e tópicos.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="section-container">
          <h2>Sobre Nós</h2>
          <p>Somos uma plataforma dedicada a ajudar estudantes a alcançarem seus objetivos acadêmicos por meio de ferramentas de estudo personalizadas.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} SynapLearn</p>
      </footer>
    </div>
  );
}
