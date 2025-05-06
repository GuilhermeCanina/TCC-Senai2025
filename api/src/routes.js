const express = require('express');
const routes = express.Router();

const usuariosController = require('./controllers/controllerUser');
const medalhasController = require('./controllers/controllerMedalha');
const sessaoEstudoController = require('./controllers/controllerSessaoEstudo');
const mensagensController = require('./controllers/controllermensagens');

// Definindo as rotas


routes.get('/usuarios', usuariosController.getAllUsers);
routes.get('/usuarios/:id', usuariosController.getUserById);
routes.post('/usuarios', usuariosController.createUser);
routes.put('/usuarios/:id', usuariosController.updateUser);
routes.delete('/usuarios/:id', usuariosController.deleteUser);


// Rotas para medalhas
routes.get('/medalhas', medalhasController.getAllMedalhas);
routes.get('/medalhas/:id', medalhasController.getMedalhaById);
routes.post('/medalhas', medalhasController.createMedalha);

// Rotas para sessões de estudo

routes.get('/sessoes', sessaoEstudoController.getAllSessoes);
routes.get('/sessoes/:id', sessaoEstudoController.getSessaoById);
routes.post('/sessoes', sessaoEstudoController.createSessaoEstudo);
routes.put('/sessoes/:id', sessaoEstudoController.updateSessao);
routes.delete('/sessoes/:id', sessaoEstudoController.deleteSessao);

// Rotas mensagens

routes.post('/mensagens', mensagensController.enviarMensagem);
routes.get('/usuarios/:usuarioId/mensagens', mensagensController.buscarMensagensPorUsuario);


module.exports = routes;