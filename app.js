const express = require('express');
const app = express();
const userRoutes = require('./routes/routes');

app.use(express.json());
app.use(express.static('public'));  // Serve arquivos estáticos do front-end

app.use('/', userRoutes);  // Rotas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
