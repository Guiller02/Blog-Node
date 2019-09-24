const express = require('express');

const Post = require('../controllers/postsController');

const Comment = require('../controllers/commentController');

const authMiddleware = require('../controllers/auth');

const router = express.Router();

//Posts Routes

router.get('/', Post.post_list);

router.post('/', authMiddleware, Post.post_create);

router.get('/:postId', Post.post_search);

router.delete('/:postId', authMiddleware, Post.post_delete);

router.put('/:postId', authMiddleware, Post.post_update);

//Comments Routes

router.post('/:postId', authMiddleware, Comment.Comment_create);

router.put('/:postId/:CommentId', authMiddleware, Comment.Comment_update);

router.put('/:postId/:CommentId/up', authMiddleware, Comment.Rank_up);

router.put('/:postId/:CommentId/down', authMiddleware, Comment.Rank_down);

router.delete('/:postId/:CommentId', authMiddleware, Comment.Comment_delete);

module.exports = router;
