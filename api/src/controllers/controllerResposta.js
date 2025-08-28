const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Criar uma nova resposta
async function criarResposta(req, res) {
  const { usuarioId, questaoId, correta } = req.body;
  try {
    const resposta = await prisma.resposta.create({
      data: { usuarioId, questaoId, correta },
    });
    res.json(resposta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar resposta" });
  }
}

// Gerar relatório filtrado por período
async function relatorio(req, res) {
  const { usuarioId } = req.params;
  const { periodo } = req.query;

  let dataInicial;
  const agora = new Date();

  if (periodo === "1d") dataInicial = new Date(agora.getTime() - 1 * 24 * 60 * 60 * 1000);
  else if (periodo === "7d") dataInicial = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
  else if (periodo === "30d") dataInicial = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
  else dataInicial = new Date(0); // pega tudo se não informar

  try {
    const respostas = await prisma.resposta.findMany({
      where: {
        usuarioId: usuarioId ? Number(usuarioId) : undefined,
        createdAt: { gte: dataInicial },
      },
    });

    const corretas = respostas.filter(r => r.correta).length;
    const erradas = respostas.filter(r => !r.correta).length;

    res.json({ total: respostas.length, corretas, erradas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar relatório" });
  }
}

module.exports = { criarResposta, relatorio };
