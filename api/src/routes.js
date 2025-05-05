const express = require('express');
const routes = express.Router();

const usuariosController = require('./controllers/controllerUser');
const medalhasController = require('./controllers/controllerMedalha');

// Definindo as rotas

routes.get('/usuarios', usuariosController.getAllUsers);
routes.get('/usuarios/:id', usuariosController.getUserById);
routes.post('/usuarios', usuariosController.createUser);
routes.put('/usuarios/:id', usuariosController.updateUser);
routes.delete('/usuarios/:id', usuariosController.deleteUser);

routes.get('/medalhas', medalhasController.getAllMedalhas);
routes.get('/medalhas/:id', medalhasController.getMedalhaById);
routes.post('/medalhas', medalhasController.createMedalha);


module.exports = routes;