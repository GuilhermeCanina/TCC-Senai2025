import { useState } from "react";
import axios from "axios";
import "../styles/iniciarestudo.css";

export default function IniciarEstudo() {
  const [ano, setAno] = useState(2020);
  const [limite, setLimite] = useState(5);
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [respostas, setRespostas] = useState({});

  const buscarQuestoes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.enem.dev/v1/exams/${ano}/questions?limit=${limite}`
      );
      setQuestoes(response.data.questions);
      setRespostas({});
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      alert("Erro ao carregar questões. Tente novamente.");
    }
    setLoading(false);
  };

  const escolherAlternativa = (index, letra) => {
    setRespostas((prev) => ({ ...prev, [index]: letra }));
  };

  return (
    <div className="container">
      <h1>Iniciar Estudo</h1>

      <div className="inputs">
        <label>
          Ano:
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            min="1998"
            max={new Date().getFullYear()}
          />
        </label>

        <label>
          Limite:
          <input
            type="number"
            min="1"
            max="50"
            value={limite}
            onChange={(e) => setLimite(e.target.value)}
          />
        </label>

        <button onClick={buscarQuestoes} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar Questões'}
        </button>
      </div>

      {loading && <p className="loading">Carregando questões...</p>}

      {questoes.map((q) => {
        const respostaCorreta = q.alternatives.find((a) => a.isCorrect)?.letter;
        const respostaUsuario = respostas[q.index];
        const acertou = respostaUsuario === respostaCorreta;

        return (
          <section key={q.index} className="questao-card">
            <h3>Questão {q.index}</h3>
            {q.context && <p className="context">{q.context}</p>}
            {q.alternativesIntroduction && <p className="intro">{q.alternativesIntroduction}</p>}

            <ul className="alternativas">
              {q.alternatives.map((a) => {
                const isEscolhida = respostaUsuario === a.letter;
                const mostrarCor = respostaUsuario 
                  ? a.isCorrect 
                    ? "var(--success)" 
                    : isEscolhida 
                    ? "var(--danger)" 
                    : "inherit"
                  : "inherit";

                return (
                  <li key={a.letter}>
                    <button
                      onClick={() => escolherAlternativa(q.index, a.letter)}
                      className={`alternativa ${isEscolhida ? "selecionada" : ""}`}
                      style={{ color: mostrarCor }}
                      disabled={!!respostaUsuario}
                    >
                      <strong>{a.letter}:</strong> {a.text}
                    </button>
                  </li>
                );
              })}
            </ul>

            {respostaUsuario && (
              <p className={`resultado ${acertou ? "correto" : "errado"}`}>
                {acertou 
                  ? "✅ Resposta Correta!" 
                  : `❌ Resposta Incorreta! A correta é ${respostaCorreta}.`}
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}