const express = require('express')
const app = express();
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const PORT = 3000;

app.use(agentesRoutes)
app.use(casosRoutes)
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});