const { Post, Comentario } = require('../models/post');

// Lista todos os posts com comentários associados
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: Comentario,
                attributes: ['id', 'conteudo', 'autor'], // Seleciona apenas os campos necessários
            },
            order: [['createdAt', 'DESC']], // Ordena pelo mais recente
        });
        res.json(posts);
    } catch (error) {
        console.error("Erro ao buscar posts:", error);
        res.status(500).json({ message: 'Erro ao buscar posts', error });
    }
};

// Cria um novo post
exports.createPost = async (req, res) => {
    const { titulo, conteudo, autor } = req.body;
    if (!titulo || !conteudo || !autor) {
        return res.status(400).json({ message: 'Título, conteúdo e autor são obrigatórios.' });
    }

    try {
        const post = await Post.create({ titulo, conteudo, autor });
        console.log("Post criado com sucesso:", post);
        res.status(201).json(post);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).json({ message: 'Erro ao criar post', error });
    }
};

// Edita um post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo } = req.body;
    if (!titulo || !conteudo) {
        return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
    }

    try {
        const [updatedRows] = await Post.update({ titulo, conteudo }, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }
        console.log("Post atualizado com sucesso:", { id, titulo });
        res.json({ message: 'Post atualizado com sucesso' });
    } catch (error) {
        console.error("Erro ao atualizar post:", error);
        res.status(500).json({ message: 'Erro ao atualizar post', error });
    }
};

// Exclui um post
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await Post.destroy({ where: { id } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }
        console.log("Post excluído com sucesso:", { id });
        res.json({ message: 'Post excluído com sucesso' });
    } catch (error) {
        console.error("Erro ao excluir post:", error);
        res.status(500).json({ message: 'Erro ao excluir post', error });
    }
};

// Incrementa curtidas
exports.likePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado.' });
        }
        await post.increment('curtidas');
        console.log("Post curtido com sucesso:", { id });
        res.json({ message: 'Post curtido com sucesso' });
    } catch (error) {
        console.error("Erro ao curtir post:", error);
        res.status(500).json({ message: 'Erro ao curtir post', error });
    }
};

// Adiciona um comentário
exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { conteudo, autor } = req.body;
    if (!conteudo || !autor) {
        return res.status(400).json({ message: 'Conteúdo e autor são obrigatórios.' });
    }

    try {
        const comentario = await Comentario.create({ postId: id, conteudo, autor });
        console.log("Comentário adicionado com sucesso:", comentario);
        res.status(201).json(comentario);
    } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
        res.status(500).json({ message: 'Erro ao adicionar comentário', error });
    }
};
