const db = require('../config_back/db');

const Post = db.sequelize.define('post', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  conteudo: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
  autor: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  curtidas: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0,
  },
}, 
{ timestamps: true, freezeTableName: true });

const Comentario = db.sequelize.define('comentario', {
  id: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  postId: {
    type: db.Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'id'
    }
  },
  conteudo: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
  autor: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
}, 
{ timestamps: true, freezeTableName: true });

Post.hasMany(Comentario, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comentario.belongsTo(Post, { foreignKey: 'postId' });

// Sincronizar as tabelas
//Post.sync();
//Comentario.sync();

module.exports = { Post, Comentario };
