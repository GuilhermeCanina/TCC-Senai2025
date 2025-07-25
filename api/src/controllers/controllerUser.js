const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function getMe(req, res) {
    try {
        const user = await prisma.usuario.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                criadoEm: true,
                }
        });

        res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        res.status(500).json({ error: 'Erro interno ao obter usuário' });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await prisma.usuario.findMany();
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
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    try {
        let dataToUpdate = { nome, email };

        if (senha) {
            dataToUpdate.senha = await bcrypt.hash(senha, 10);
        }

        const updatedUser = await prisma.usuario.update({
            where: { id: Number(id) },
            data: dataToUpdate,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message, error);
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Email já está em uso' });
        } else if (error.code === 'P2025') {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}

async function createUser(req, res) {
    const { nome, email, senha, role } = req.body;

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);

        const newUser = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: hashedSenha,
                role, // ← usa o que veio do body
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


async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        await prisma.usuario.delete({
            where: { id: Number(id) },
        });
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
}

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await prisma.usuario.findUnique({ where: { email } });

        if (!user) return res.status(401).json({ error: 'Email ou senha incorretos.' });

        const validPassword = await bcrypt.compare(senha, user.senha);
        if (!validPassword) return res.status(401).json({ error: 'Email ou senha incorretos.' });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
                'seuSegredoJWT',
                { expiresIn: '1d' }
            );
        res.json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getMe
};