const db = require('../config_back/db2');

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

// Função para buscar todos os posts
Post.getAllPosts = (callback) => {
  Post.findAll()
    .then(posts => callback(null, posts))
    .catch(err => callback(err));
};

// Função para criar post
Post.createPost = (titulo, conteudo, autor, callback) => {
  Post.create({ titulo, conteudo, autor })
    .then(() => callback(null))
    .catch(err => callback(err));
};

// Função para atualizar post
Post.updatePost = (id, titulo, conteudo, callback) => {
  Post.update({ titulo, conteudo }, { where: { id } })
    .then(() => callback(null))
    .catch(err => callback(err));
};

// Função para deletar post
Post.deletePost = (id, callback) => {
  Post.destroy({ where: { id } })
    .then(() => callback(null))
    .catch(err => callback(err));
};

// Função para curtir um post
Post.likePost = (id, callback) => {
  Post.findByPk(id)
    .then(post => {
      if (post) {
        post.increment('curtidas', { by: 1 });
        callback(null);
      } else {
        callback(new Error('Post não encontrado'));
      }
    })
    .catch(err => callback(err));
};

// Forçando a criação da tabela 'posts' (cuidado, isso apaga dados existentes)
Post.sync({ force: true }).then(() => {
    console.log('Tabela "posts" criada!');
  });

module.exports = Post;


