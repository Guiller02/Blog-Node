var Comment = require('../models/commentsModel');

// Create a new Comment
exports.Comment_create = async (req, res) => {
    try {
        const { title, description } = req.body;
        const comment = await Comment.create({ title, description, user: req.userId, post:req.params.postId });
        res.send(comment);
    } catch (err) {
        console.log(err);
        res.send({ erro: 'erro ao tentar cadastrar um novo comentario' });
    }
    
};

// // Delete Comment
// exports.Comment_delete = async (req, res) => {
//     try {
//         //Retornando usuario logado
//         const isUser = req.userId;
//         //procurando o id do usuario que fez a Commentagem
//         const { user } = await Comment.findById(req.params.CommentId);
//         //comparando se é o mesmo usuario
//         if (isUser != user)
//             return res.status(401).send({ erro: 'usuario invalido!' });
//         const Comment = await Comment.findByIdAndDelete(req.params.CommentId);
//         res.send({ Comment });
//     } catch (err) {
//         res.send({ erro: 'erro ao procurar o comentario' });
//         console.log(err);
//     }
// };

// // Update Comment
// exports.Comment_update = async (req, res) => {
//     try {
//         //Retornando usuario logado
//         const isUser = req.userId;
//         //procurando o id do usuario que fez a Commentagem
//         const { user } = await Comment.findById(req.params.CommentId)
//         //comparando se é o mesmo usuario
//         if (isUser != user)
//             return res.status(401).send({ erro: 'usuario invalido!' });
//         const { title, description } = req.body;

//         const updatedComment = await Comment.findByIdAndUpdate(req.params.CommentId, {
//             title,
//             description
//         }, { new: true });

//         res.send({ updatedComment });

//     } catch (err) {
//         console.log(err);
//         res.send({ erro: 'erro ao procurar a Commentagem' });
//     }
// };