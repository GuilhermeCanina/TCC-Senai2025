const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Verifica os critérios de medalhas e entrega ao usuário se aplicável.
 * @param {number} usuarioId
 * @returns {Promise<number[]>} - Lista de IDs de medalhas entregues
 */



async function verificarEMedalharUsuario(usuarioId) {
    const sessoes = await prisma.sessaoEstudo.findMany({ where: { usuarioId } });
    const mensagens = await prisma.mensagem.findMany({ where: { usuarioId } });

    const usuarioMedalhas = await prisma.usuarioMedalha.findMany({
        where: { usuarioId },
        select: { medalhaId: true },
    });
    const medalhasRecebidas = usuarioMedalhas.map(m => m.medalhaId);

    const entregas = [];

    // Medalha 1: Primeira Sessão
    if (sessoes.length >= 1 && !medalhasRecebidas.includes(1)) {
        entregas.push(1);
    }

    // Medalha 2: 5 Sessões
    if (sessoes.length >= 5 && !medalhasRecebidas.includes(2)) {
        entregas.push(2);
    }

    // Medalha 3: Sessão com pelo menos 120 minutos
    const maratona = sessoes.some(s => s.duracao >= 120);
    if (maratona && !medalhasRecebidas.includes(3)) {
        entregas.push(3);
    }

    // Medalha 4: Primeira mensagem enviada
    if (mensagens.length >= 1 && !medalhasRecebidas.includes(4)) {
        entregas.push(4);
    }

    for (const medalhaId of entregas) {
        await prisma.usuarioMedalha.create({
            data: {
                usuarioId,
                medalhaId
            }
        });
    }

    return entregas;
}

module.exports = {
    verificarEMedalharUsuario
};
