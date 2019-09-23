const express = require('express');

const Post = require('../controllers/postsController');

const router = express.Router();



router.get('/', Post.post_list);

router.post('/', Post.post_create);

router.get('/:postId', Post.post_search);

router.delete('/:postId', Post.post_delete);

router.put('/:postId', Post.post_update);

module.exports = router;
