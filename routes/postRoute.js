const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');

// Rota para listar todos os posts
router.get('/', postController.getAllPosts);

// Rota para criar um novo post
router.post('/', postController.createPost);

// Rota para editar um post
router.put('/:id', postController.updatePost);

// Rota para deletar um post
router.delete('/:id', postController.deletePost);

// Rota para curtir um post
router.post('/:id/like', postController.likePost);

// Rota para adicionar comentários
router.post('/:id/comentarios', postController.addComment);

module.exports = router;
