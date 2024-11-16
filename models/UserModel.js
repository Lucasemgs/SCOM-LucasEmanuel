const db = require('../config_back/db');
const bcrypt = require('bcrypt');

const User = db.sequelize.define('user', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Nome: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Senha: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  Cargo: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
},
  { timestamps: false, freezeTableName: true });

// Hash da senha antes de criar o usuário
User.beforeCreate(async (user, options) => {
  const saltRounds = 10;
  user.Senha = await bcrypt.hash(user.Senha, saltRounds);
});

// Funções CRUD de Usuário
User.getAllUsers = (callback) => {
  User.findAll()
    .then(users => callback(null, users))
    .catch(err => callback(err));
};

User.createUser = (Nome, Email, Senha, Cargo, callback) => {
  User.create({ Nome, Email, Senha, Cargo })
    .then(() => callback(null))
    .catch(err => callback(err));
};

User.updateUser = (id, Nome, Email, Cargo, callback) => {
  User.update({ Nome, Email, Cargo }, { where: { id } })
    .then(() => callback(null))
    .catch(err => callback(err));
};

User.deleteUser = (id, callback) => {
  User.destroy({ where: { id } })
    .then(() => callback(null))
    .catch(err => callback(err));
};

module.exports = User;
