const express = require("express");
const router = express.Router();
const User = require('../models/UserModel');

// Rota para atualizar um usuário
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Email, Cargo } = req.body;

    try {
        // Busca o usuário pelo ID
        const user = await User.findByPk(id);

        // Se o usuário não for encontrado, retorna um erro
        if (!user) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        // Atualiza os dados do usuário
        await user.update({ Nome, Email, Cargo });

        // Retorna o usuário atualizado
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ erro: 'Erro ao atualizar o usuário.' });
    }
});

module.exports = router;
