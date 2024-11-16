const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Carregar rotas
const cadastro = require('./routes/cadastro');
const login = require('./routes/login'); // Carregando a rota de login
const create = require('./routes/create');
const busca = require('./routes/busca');
const edit = require('./routes/edit');
const deleteUser = require('./routes/delete');
const post = require('./routes/postRoute');
// Usar rotas
app.use('/cadastro', cadastro);
app.use('/login', login); // Adicionando a rota de login
app.use('/create', create);
app.use('/busca', busca);
app.use('/edit', edit);
app.use('/delete', deleteUser);
app.use('/postRoute', post);

app.listen(PORT, () => {
    console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
