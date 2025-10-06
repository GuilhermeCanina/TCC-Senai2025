const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllMedalhas(req, res) {
    try {
        const medalhas = await prisma.medalha.findMany();
        console.log('Medalhas encontradas:', medalhas); 
        res.status(200).json(medalhas);
    } catch (error) {
        console.error('Error fetching medalhas:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getMedalhaById(req, res) {
    const { id } = req.params;
    try {
        const medalha = await prisma.medalha.findUnique({
            where: { id: Number(id) },
            include: {
                usuarios: true,
            },
        });
        if (!medalha) {
            return res.status(404).json({ error: 'Medalha not found' });
        }
        console.log('Medalha encontrada:', medalha); 
        res.status(200).json(medalha);
    } catch (error) {
        console.error('Error fetching medalha:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createMedalha(req, res) {
    const { titulo, descricao } = req.body;

    try {
        const newMedalha = await prisma.medalha.create({
            data: {
                titulo,
                descricao,
            },
        });

        console.log('Nova medalha criada:', newMedalha); 
        res.status(201).json(newMedalha);
    } catch (error) {
        console.error('Error creating medalha:', error);
    }
}

module.exports = {
    getAllMedalhas,
    getMedalhaById,
    createMedalha,
};
