const express = require('express');

const Post = require('../controllers/postsController');

const Comment = require('../controllers/commentController');

const authMiddleware = require('../controllers/auth');

const router = express.Router();



router.get('/', Post.post_list);

router.post('/', authMiddleware, Post.post_create);

// router.get('/:postId', (req,res)=>{
//     const retornar = Post.post_search
//     const retornar2 =Comment.Comment_list 
//     res.send(retornar,retornar2)
// });x

router.get('/:postId', Post.post_search);

router.delete('/:postId', authMiddleware, Post.post_delete);

router.put('/:postId', authMiddleware, Post.post_update);

router.post('/:postId', authMiddleware, Comment.Comment_create);


module.exports = router;
