const UserModel = require('../models/UserModel');

exports.getUsers = (req, res) => {
    UserModel.getAllUsers((err, users) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar usuários' });
        res.json(users);
    });
};

exports.createUser = (req, res) => {
    const { username, password } = req.body;
    UserModel.createUser(username, password, (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao criar usuário' });
        res.json({ message: 'Usuário criado com sucesso' });
    });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    UserModel.deleteUser(id, (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao excluir usuário' });
        res.json({ message: 'Usuário excluído com sucesso' });
    });
};
