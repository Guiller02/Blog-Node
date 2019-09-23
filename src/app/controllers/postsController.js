var Post = require('../models/postsModel');

// Display all posts
exports.post_list = async (req, res) => {
    try {
        const posts = await Post.find().populate(['user']);
        res.send(posts);
    }
    catch (err) {
        res.send({ erro: 'erro ao listar as postagens' });
        console.log(err);
    }
};

// Create a new post
exports.post_create = async (req, res) => {
    try {
        const { title, description } = req.body;
        const post = await Post.create({ title, description, user: req.userId });
        res.send(post);
    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao tentar cadastrar uma nova postagem' });
    }
};

// Show unique post
exports.post_search = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user');
        res.send({ post });
    } catch (err) {
        res.send({ erro: 'erro ao procurar a postagem' });
        console.log(err);
    }
};

// Delete post
exports.post_delete = async (req, res) => {
    try {
        //Retornando usuario logado
        const isUser = req.userId;
        //procurando o id do usuario que fez a postagem
        const { user } = await Post.findById(req.params.postId)
        //comparando se é o mesmo usuario
        if (isUser != user)
            return res.status(401).send({ erro: 'usuario invalido!' });
        const post = await Post.findByIdAndDelete(req.params.postId);
        res.send({ post });
    } catch (err) {
        res.send({ erro: 'erro ao procurar a postagem' });
        console.log(err);
    }
};

// Update post
exports.post_update = async (req, res) => {
    try {
        //Retornando usuario logado
        const isUser = req.userId;
        //procurando o id do usuario que fez a postagem
        const { user } = await Post.findById(req.params.postId)
        //comparando se é o mesmo usuario
        if (isUser != user)
            return res.status(401).send({ erro: 'usuario invalido!' });
        const { title, description } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
            title,
            description
        }, { new: true });

        res.send({ updatedPost });

    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao procurar a postagem' });
    }
};