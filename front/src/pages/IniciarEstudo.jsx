import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../styles/iniciarestudo.css";

export default function IniciarEstudo() {
  const [ano, setAno] = useState(2020);
  const [limite, setLimite] = useState(5);
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [respostas, setRespostas] = useState({});
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tkn = localStorage.getItem("token");
    if (usuario?.id && tkn) {
      setUser({ id: usuario.id });
      setToken(tkn);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = secs => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const buscarQuestoes = async () => {
    if (!user || !token) { alert("Você precisa estar logado para buscar questões."); return; }
    setLoading(true);
    try {
      const response = await axios.get(`https://api.enem.dev/v1/exams/${ano}/questions?limit=${limite}`);
      setQuestoes(response.data.questions);
      setRespostas({});
      setSeconds(0);
      setIsRunning(true);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      alert("Erro ao carregar questões. Tente novamente.");
    }
    setLoading(false);
  };

  const encerrarSessao = async () => {
    setIsRunning(false);
    const minutos = Math.floor(seconds / 60);
    if (minutos === 0) { alert("Sessão muito curta, não será salva."); return; }
    try {
      await axios.post(
        "https://api-tcc-senai2025.vercel.app/sessoes",
        { usuarioId: user.id, topico: "Questões ENEM", duracao: minutos },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Sessão salva! Duração: ${minutos} minutos`);
      setSeconds(0);
      setQuestoes([]);
    } catch (err) {
      console.error("Erro ao salvar sessão:", err);
      alert("Erro ao salvar sessão");
    }
  };

  const escolherAlternativa = async (index, letra) => {
    setRespostas(prev => ({ ...prev, [index]: letra }));
    const questao = questoes.find(q => q.index === index);
    if (!questao || !user || !token) return;
    const respostaCorreta = questao.alternatives.find(a => a.isCorrect)?.letter;
    const acertou = letra === respostaCorreta;
    try {
      await axios.post(
        "https://api-tcc-senai2025.vercel.app/respostas",
        { usuarioId: user.id, questaoId: questao.index, correta: acertou },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) { console.error("Erro ao salvar resposta:", err); }
  };

  const mensagensErradas = ["Não foi dessa vez!", "Ops, tente novamente!", "Quase lá!", "Resposta incorreta!"];

  const markdownComponents = {
    p: ({node, ...props}) => <p className={props.className} {...props} />,
    img: ({node, ...props}) => <img className="questao-img" {...props} />
  };

  return (
    <div className="container">
      <h1>Iniciar Estudo</h1>
      <p className="timer">⏳ Tempo: {formatTime(seconds)}</p>

      <div className="inputs">
        <label>Ano:
          <input type="number" value={ano} onChange={e => setAno(e.target.value)} min="1998" max={new Date().getFullYear()} />
        </label>
        <label>Limite:
          <input type="number" min="1" max="50" value={limite} onChange={e => setLimite(e.target.value)} />
        </label>
        <button onClick={buscarQuestoes} disabled={loading}>{loading ? "Buscando..." : "Buscar Questões"}</button>
        {isRunning && <button onClick={encerrarSessao} className="encerrar">⏹️ Encerrar Sessão</button>}
      </div>

      {loading && <p className="loading">Carregando questões...</p>}

      {questoes.map(q => {
        const respostaUsuario = respostas[q.index];
        const respostaCorreta = q.alternatives.find(a => a.isCorrect)?.letter;
        const acertou = respostaUsuario === respostaCorreta;
        const mensagem = respostaUsuario ? (acertou ? "✅ Resposta Correta!" : mensagensErradas[Math.floor(Math.random() * mensagensErradas.length)]) : "";

        return (
          <section key={q.index} className="questao-card">
            <h3>Questão {q.index}</h3>
            {q.context && <ReactMarkdown components={markdownComponents}>{q.context}</ReactMarkdown>}
            {q.alternativesIntroduction && <ReactMarkdown components={markdownComponents}>{q.alternativesIntroduction}</ReactMarkdown>}
            <ul className="alternativas">
              {q.alternatives.map(a => {
                const isEscolhida = respostaUsuario === a.letter;
                const mostrarCor = respostaUsuario ? (a.isCorrect ? "var(--success)" : isEscolhida ? "var(--danger)" : "inherit") : "inherit";
                return (
                  <li key={a.letter}>
                    <button onClick={() => escolherAlternativa(q.index, a.letter)} className={`alternativa ${isEscolhida ? "selecionada" : ""}`} style={{ color: mostrarCor }} disabled={!!respostaUsuario}>
                      <strong>{a.letter}:</strong> {a.text}
                    </button>
                  </li>
                );
              })}
            </ul>
            {respostaUsuario && <p className={`resultado ${acertou ? "correto" : "errado"}`}>{mensagem} {acertou ? "" : `A correta é ${respostaCorreta}.`}</p>}
          </section>
        );
      })}
    </div>
  );
}
