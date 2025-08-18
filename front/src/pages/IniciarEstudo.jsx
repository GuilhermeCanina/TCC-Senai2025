import { useState } from "react";
import axios from "axios";
import "../styles/inicialestudo.css";

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

        <button onClick={buscarQuestoes}>Buscar Questões</button>
      </div>

      {loading && <p>Carregando...</p>}

      {questoes.map((q) => (
        <section key={q.index} className="questao-card">
          <h3>{q.title}</h3>
          <p className="context">{q.context}</p>
          <p className="intro">{q.alternativesIntroduction}</p>

          <ul className="alternativas">
            {q.alternatives.map((a) => {
              const escolha = respostas[q.index];
              const isEscolhida = escolha === a.letter;
              const correta = a.isCorrect;
              const mostrarCor = escolha
                ? correta
                  ? "green"
                  : isEscolhida
                  ? "red"
                  : "black"
                : "black";

              return (
                <li key={a.letter}>
                  <button
                    onClick={() => escolherAlternativa(q.index, a.letter)}
                    className={`alternativa ${isEscolhida ? "selecionada" : ""}`}
                    style={{ color: mostrarCor }}
                    disabled={!!respostas[q.index]}
                  >
                    {a.letter}: {a.text}
                  </button>
                </li>
              );
            })}
          </ul>

          {respostas[q.index] && (
            <p className="resultado">
              {respostas[q.index] ===
              q.alternatives.find((a) => a.isCorrect).letter
                ? "✅ Correto!"
                : "❌ Errado!"}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
