const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllUsers(req, res) {
    try {
        const users = await prisma.usuario.findMany();
        console.log('Usuários encontrados:', users); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await prisma.usuario.findUnique({
            where: { id: Number(id) },
            include: {
                sessoes: true,
                mensagens: true,
                medalhas: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('Usuário encontrado:', user); 
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createUser(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const newUser = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha,
            },
        });

        console.log('Novo usuário criado:', newUser); 
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Email já está em uso' });
        } else {
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
};
