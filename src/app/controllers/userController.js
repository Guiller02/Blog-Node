var User = require('../models/userModel');

const bcrypt = require("bcryptjs");

const authConfig = require('../../config/auth');

const jwt = require("jsonwebtoken");

// Generate token
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
};

// Create a new User
exports.User_register = async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuario já cadastrado' });
    const user = await User.create(req.body);

    user.password = undefined;

    res.send({
      user,
      token: generateToken({
        id: user.id
      })
    });

  } catch (err) {
    console.log(err);
    res.send({ erro: 'erro ao tentar cadastrar uma novo user' });
  }
};

// Authenticate User
exports.User_login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).send({ error: 'User not found' });
  if (!(await bcrypt.compare(password, user.password)))

    return res.status(400).send({ error: "Invalid password" });

  user.password = undefined;

  res.send({
    user,
    token: generateToken({
      id: user.id
    })
  });
};

// Show perfil
exports.user_perfil = async (req, res) => {
  try {
    const user = await User.findOne(req.params.UserId)
    res.send({ user });
  } catch (err) {
    res.send({ erro: 'erro ao procurar a postagem' });
    console.log(err);
  }
};

// Show unique user
exports.user_find = async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId)
    res.send(user);
  } catch (err) {
    res.send({ erro: 'erro ao procurar o usuario' });
    console.log(err);
  }
};

// Update user
// exports.Comment_update = async (req, res) => {
//   try {
//     //Retornando usuario logado
//     const isUser = req.userId;
//     const { comment } = req.body;
//     if (comment == null)
//       res.status(400).send({ error: 'Cannot update' })
//     const updatedComment = await Comment.findByIdAndUpdate(req.params.CommentId, {
//       comment
//     }, { new: true });

//     res.send({ updatedComment });

//   } catch (err) {
//     console.log(err);
//     res.send({ erro: 'erro ao procurar o comentario' });
//   }
// };