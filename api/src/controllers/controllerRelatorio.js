const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Cria relatório
async function criarRelatorio(req, res) {
  try {
    const { usuarioId, questaoNumero, enunciado, respostaUsuario, respostaCorreta, acertou } = req.body;

    const relatorio = await prisma.relatorio.create({
      data: {
        usuarioId,
        questaoNumero,
        enunciado,
        respostaUsuario,
        respostaCorreta,
        acertou,
      },
    });

    res.status(201).json(relatorio);
  } catch (error) {
    console.error("Erro ao criar relatório:", error);
    res.status(500).json({ error: "Erro ao criar relatório" });
  }
}

// Lista relatórios de um usuário
async function listarRelatorios(req, res) {
  try {
    const { usuarioId } = req.params;

    const relatorios = await prisma.relatorio.findMany({
      where: { usuarioId: Number(usuarioId) },
      orderBy: { criadoEm: "desc" },
    });

    res.json(relatorios);
  } catch (error) {
    console.error("Erro ao buscar relatórios:", error);
    res.status(500).json({ error: "Erro ao buscar relatórios" });
  }
}

module.exports = {
  criarRelatorio,
  listarRelatorios,
};
