import { useEffect, useState } from "react";
import axios from "axios";

export default function Medalhas() {
  const [medalhas, setMedalhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");

    if (!usuario || !token) {
      setError("Você precisa estar logado para ver suas medalhas.");
      setLoading(false);
      return;
    }

    axios.get(`https://api-tcc-senai2025.vercel.app/usuarios/${usuario.id}/medalhas`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMedalhas(res.data))
    .catch(err => setError("Erro ao carregar medalhas."))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando medalhas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏅 Minhas Medalhas</h1>
      {medalhas.length === 0 ? (
        <p>Você ainda não ganhou nenhuma medalha. Continue estudando!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {medalhas.map(m => (
            <li key={m.id} style={{
              border: "1px solid #ccc",
              borderRadius: "12px",
              padding: "10px",
              marginBottom: "10px",
              background: "#f9f9f9"
            }}>
              <h3>🏅 {m.titulo}</h3>
              <p>{m.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
