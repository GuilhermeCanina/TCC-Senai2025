import { useState } from "react";
import axios from "axios";

export default function Redacao() {
  const [tema, setTema] = useState("");
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const enviarRedacao = async () => {
    if (!texto) return alert("Digite a redação");

    setLoading(true);
    try {
      const res = await axios.post("https://api-tcc-senai2025.vercel.app/api/redacao", { texto });
      setResultado(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao corrigir redação");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Redação ENEM</h1>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows="15"
        cols="80"
        placeholder="Escreva sua redação aqui..."
      />

      <br />
      <button onClick={enviarRedacao} disabled={loading}>
        {loading ? "Corrigindo..." : "Enviar Redação"}
      </button>

      {resultado && (
        <div className="resultado">
          <h2>Resultado</h2>
          <ul>
            <li>Competência 1: {resultado.competencia1}</li>
            <li>Competência 2: {resultado.competencia2}</li>
            <li>Competência 3: {resultado.competencia3}</li>
            <li>Competência 4: {resultado.competencia4}</li>
            <li>Competência 5: {resultado.competencia5}</li>
          </ul>
          <p><strong>Nota Final: {resultado.notaFinal}</strong></p>
          <p>Comentários: {resultado.comentarios}</p>
        </div>
      )}
    </div>
  );
}
