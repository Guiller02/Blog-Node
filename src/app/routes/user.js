const express = require('express');

const User = require('../controllers/userController');

const router = express.Router();

router.post('/register', User.User_register);

router.post('/login', User.User_login);

// router.get('/:UserId', User.User_search);

// router.delete('/:UserId', User.User_delete);

// router.put('/:UserId', User.User_update);

module.exports = router;
