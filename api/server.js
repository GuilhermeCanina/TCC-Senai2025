const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const iaRoutesModule = require('./src/iaRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/swagger.json');
const iaRoutes = iaRoutesModule.default;
const app = express();
const path = require('path');


//uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/api', iaRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORTA = 3001;

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log('Documentação em http://localhost:3001/docs');
});
