const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verificarEMedalharUsuario } = require('../services/medalhasService');

async function getAllSessoes(req, res) {
  try {
    const sessoes = await prisma.sessaoEstudo.findMany();
    res.json(sessoes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar sessões' });
  }
}

async function getSessaoById(req, res) {
  const { id } = req.params;
  try {
    const sessao = await prisma.sessaoEstudo.findUnique({
      where: { id: Number(id) },
    });
    if (!sessao) return res.status(404).json({ error: 'Sessão não encontrada' });
    res.json(sessao);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar sessão' });
  }
}


async function createSessaoEstudo(req, res) {
  const { usuarioId, topico, duracao } = req.body;

  try {
      const novaSessao = await prisma.sessaoEstudo.create({
          data: { usuarioId, topico, duracao },
      });

      await verificarEMedalharUsuario(usuarioId); 

      res.status(201).json(novaSessao);
  } catch (error) {
      console.error('Erro ao criar sessão:', error);
      res.status(500).json({ error: 'Erro ao criar sessão' });
  }
}


async function updateSessao(req, res) {
  const { id } = req.params;
  const { topico, duracao } = req.body;
  try {
    const atualizada = await prisma.sessaoEstudo.update({
      where: { id: Number(id) },
      data: { topico, duracao },
    });
    res.json(atualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar sessão' });
  }
}

async function deleteSessao(req, res) {
  const { id } = req.params;
  try {
    await prisma.sessaoEstudo.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Sessão deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar sessão' });
  }
}

module.exports = {
  getAllSessoes,
  getSessaoById,
  createSessaoEstudo,
  updateSessao,
  deleteSessao,
};
