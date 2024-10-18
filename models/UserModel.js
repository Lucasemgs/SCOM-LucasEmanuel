const db = require('../config_back/db')
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
User.beforeCreate(async (user, options) => {
  const saltRounds = 10; 
  user.senha = await bcrypt.hash(user.senha, saltRounds);
});

// User.sync({force: true})
module.exports = User;
