const express = require('express');
const routes = express.Router();

const usuariosController = require('./controllers/controllerUser');

// Definindo as rotas

routes.get('/usuarios', usuariosController.getAllUsers);
routes.get('/usuarios/:id', usuariosController.getUserById);
routes.post('/usuarios', usuariosController.createUser);


module.exports = routes;