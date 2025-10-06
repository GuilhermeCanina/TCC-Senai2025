import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Relatorio() {
  const [periodo, setPeriodo] = useState("7d");
  const [dados, setDados] = useState({ corretas: 0, erradas: 0, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelatorio = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const usuarioId = usuario?.id;
      const token = localStorage.getItem("token");

      if (!usuarioId || !token) {
        alert("Faça login para ver o relatório");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `https://api-tcc-senai2025.vercel.app/respostas/${usuarioId}?periodo=${periodo}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDados(res.data);
      } catch (err) {
        console.error("Erro ao buscar relatório:", err);
        alert("Erro ao buscar relatório");
      }
      setLoading(false);
    };

    fetchRelatorio();
  }, [periodo]);

  const chartData = {
    labels: ["Acertos", "Erros"],
    datasets: [
      {
        label: "Desempenho",
        data: [dados.corretas, dados.erradas],
        backgroundColor: ["#00b894", "#d63031"],
        borderRadius: 10,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { 
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
      x: { grid: { display: false } }
    },
  };

  return (
    <div className="relatorios-container">
      
      <div className="relatorios-header">
        <h1>📊 Relatório de Desempenho</h1>
        <div className="relatorios-filtros">
          <label>
            Período:
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
              <option value="1d">Último dia</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
            </select>
          </label>
        </div>
      </div>

      <div className="relatorios-cards">
        <div className="card-relatorio">
          <h3>Total de Questões</h3>
          <p>{dados.total}</p>
        </div>
        <div className="card-relatorio">
          <h3>Acertos</h3>
          <p>{dados.corretas}</p>
        </div>
        <div className="card-relatorio">
          <h3>Erros</h3>
          <p>{dados.erradas}</p>
        </div>
      </div>

      <div className="chart-container">
        {loading ? (
          <p>Carregando gráfico...</p>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button className="btn-relatorio" onClick={() => alert("Exportar PDF")}>
          Exportar PDF
        </button>
        <button className="btn-relatorio" onClick={() => alert("Exportar CSV")}>
          Exportar CSV
        </button>
        <button className="btn-relatorio" onClick={() => setPeriodo("7d")}>
          Últimos 7 dias
        </button>
      </div>
    </div>
  );
}
