const express = require('express');

const Post = require('../controllers/postsController');

const authMiddleware = require('../controllers/auth');

const router = express.Router();



router.get('/', Post.post_list);

router.post('/', authMiddleware, Post.post_create);

router.get('/:postId', Post.post_search);

router.delete('/:postId', authMiddleware, Post.post_delete);

router.put('/:postId', authMiddleware, Post.post_update);

module.exports = router;
