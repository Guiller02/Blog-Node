const express = require('express');

const User = require('../controllers/userController');

const authMiddleware = require('../controllers/auth');

const router = express.Router();

router.post('/register', User.User_register);

router.post('/login', User.User_login);

router.get('/profile/:UserId',authMiddleware, User.user_profile);

router.get('/:UserId', User.user_find);

router.put('/profile/:UserId',authMiddleware, User.user_update);

router.get('/profile/:UserId/logout',authMiddleware,User.user_logout)

module.exports = router;
