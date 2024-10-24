const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const authConfig = require('../config_back/auth.json');

router.post('/', async (req, res) => {
    console.log(req.body);
    const { Nome, Email, Senha } = req.body;
    const Cargo = "usuario";  // Valor fixo para o cargo

    try {
        // Verifica se o email já está cadastrado
        const user = await User.findOne({
            where: {
                Email: Email
            }
        });
       
        if (user) {
            return res.status(400).send({ erro: "Email já cadastrado" });
        }

        // Cria o novo usuário com o campo 'cargo' incluído
        const novoUsuario = await User.create({
            Nome: Nome,
            Email: Email,
            Senha: Senha,
            Cargo: Cargo // Define o cargo como "usuario"
        });

        novoUsuario.Senha = undefined; // Não retorna a senha no JSON de resposta

        // Gera um token JWT
        const token = jwt.sign({ id: novoUsuario.id }, authConfig.secret, {
            expiresIn: 86400, // Expira em 24 horas
        });

        // Retorna a resposta com o novo usuário e o token
        res.status(200).send({ usuario: novoUsuario, token: token });
    } catch (err) {
        console.log(err);
        res.status(400).json({ erro: 'Erro ao cadastrar o usuário.' });
    }
});

module.exports = router;
