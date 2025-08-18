const express = require('express');
const routes = express.Router();

const usuariosController = require('./controllers/controllerUser');
const medalhasController = require('./controllers/controllerMedalha');
const sessaoEstudoController = require('./controllers/controllerSessaoEstudo');
const mensagensController = require('./controllers/controllermensagens');

const upload = require('../uploads/uploadConfig');
const { updateAvatar } = require('./controllers/controllerUser');

const validateUser = require('./middlewares/validateUser');
const autenticarToken = require('./middlewares/auth');
const isAdmin = require('./middlewares/isAdmin'); // ← novo

routes.put('/user/avatar', autenticarToken, upload.single('avatar'), updateAvatar);

routes.get('/', (req, res) => {
  res.send('API de Estudo em Grupo funcionando!');
});

// ROTAS DE USUÁRIO
routes.post('/usuarios', validateUser, usuariosController.createUser);
routes.post('/login', validateUser, usuariosController.loginUser);

routes.get('/usuarios', autenticarToken, isAdmin, usuariosController.getAllUsers); // ← apenas admin
routes.get('/usuarios/:id', autenticarToken, usuariosController.getUserById);
routes.put('/usuarios/:id', autenticarToken, usuariosController.updateUser);
routes.delete('/usuarios/:id', autenticarToken, isAdmin, usuariosController.deleteUser); // ← apenas admin
routes.patch('/usuarios/nome', autenticarToken, usuariosController.updateMyName); // ← atualizar nome do usuário

routes.get('/me', autenticarToken, usuariosController.getMe);

// ROTAS DE MEDALHA
routes.get('/medalhas', autenticarToken, medalhasController.getAllMedalhas);
routes.get('/medalhas/:id', autenticarToken, medalhasController.getMedalhaById);
routes.post('/medalhas', autenticarToken, isAdmin, medalhasController.createMedalha); // ← apenas admin

// ROTAS DE SESSÕES DE ESTUDO
routes.get('/sessoes', autenticarToken, sessaoEstudoController.getAllSessoes);
routes.get('/sessoes/:id', autenticarToken, sessaoEstudoController.getSessaoById);
routes.post('/sessoes', autenticarToken, sessaoEstudoController.createSessaoEstudo);
routes.put('/sessoes/:id', autenticarToken, sessaoEstudoController.updateSessao);
routes.delete('/sessoes/:id', autenticarToken, sessaoEstudoController.deleteSessao);


module.exports = routes;
