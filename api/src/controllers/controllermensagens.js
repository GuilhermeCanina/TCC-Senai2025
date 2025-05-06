const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function gerarRespostaBot(mensagemUsuario) {
    return `Você disse: "${mensagemUsuario}". O bot ainda está aprendendo`;
}

// Apenas um teste de resposta do bot, no futuro mudar para um chatbot de verdade

async function enviarMensagem(req, res) {
    const { usuarioId, texto } = req.body;

    try {
        const resposta = gerarRespostaBot(texto);

        const novaMensagem = await prisma.mensagem.create({
            data: {
                usuarioId: Number(usuarioId),
                texto,
                resposta,
            },
        });

        res.status(201).json(novaMensagem);
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

async function buscarMensagensPorUsuario(req, res) {
    const { usuarioId } = req.params;

    try {
        const mensagens = await prisma.mensagem.findMany({
            where: { usuarioId: Number(usuarioId) },
            orderBy: { enviadaEm: 'desc' },
        });

        res.status(200).json(mensagens);
    } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

module.exports = {
    enviarMensagem,
    buscarMensagensPorUsuario,
};
