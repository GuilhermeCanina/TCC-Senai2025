const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const iaRoutesModule = require('./src/iaRoutes');
const iaRoutes = iaRoutesModule.default;
const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/api', iaRoutes);

const PORTA = 3001;

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
