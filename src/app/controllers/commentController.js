var Comment = require('../models/commentsModel');

// Create a new Comment
exports.Comment_create = async (req, res) => {
    try {
        const { comment } = req.body;
        const createdComment = await Comment.create({ comment, user: req.userId, post: req.params.postId });
        res.send(createdComment);
    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao tentar cadastrar um novo comentario' });
    }

};

// Delete Comment
exports.Comment_delete = async (req, res) => {
    try {
        //Retornando usuario logado
        const isUser = req.userId;
        //procurando o id do usuario que fez a Commentagem
        const { user } = await Comment.findById(req.params.CommentId);
        console.log(user)
        //comparando se é o mesmo usuario
        if (isUser != user)
            return res.status(401).send({ erro: 'usuario invalido!' });
        const coment = await Comment.findByIdAndDelete(req.params.CommentId);
        res.send({ coment });
    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao procurar o comentario' });
    }
};

// Update Comment
exports.Comment_update = async (req, res) => {
    try {
        //Retornando usuario logado
        const isUser = req.userId;
        //procurando o id do usuario que fez o comentario
        const { user } = await Comment.findById(req.params.CommentId);
        console.log(user)
        //comparando se é o mesmo usuario
        if (isUser != user)
            return res.status(401).send({ erro: 'usuario invalido!' });
        const { comment } = req.body;
        if (comment == null)
            res.status(400).send({ error: 'Cannot update' })
        const updatedComment = await Comment.findByIdAndUpdate(req.params.CommentId, {
            comment
        }, { new: true });

        res.send({ updatedComment });

    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao procurar o comentario' });
    }
};

// Update rank
exports.Rank_up = async (req, res) => {
    try {

        const { rank } = await Comment.findById(req.params.CommentId)
        const upRank = rank + 1;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.CommentId, {
            rank: upRank
        }, { new: true });
        res.send({ updatedComment });

    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao procurar o comentario' });
    }
};

// Update rank
exports.Rank_down = async (req, res) => {
    try {

        const { rank } = await Comment.findById(req.params.CommentId)
        const upRank = rank - 1;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.CommentId, {
            rank: upRank
        }, { new: true });

        res.send({ updatedComment });

    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao procurar o comentario' });
    }
};