const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const PORTA = 3001;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

module.exports = routes;