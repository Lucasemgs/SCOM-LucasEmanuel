const db = require('../db');  // Conexão com banco de dados

exports.getAllUsers = (callback) => {
    db.query('SELECT * FROM users', callback);
};

exports.createUser = (username, password, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback);
};

exports.deleteUser = (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
};
