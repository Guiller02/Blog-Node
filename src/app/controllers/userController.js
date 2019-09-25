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

// Show profile
exports.user_profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.UserId)
    res.send({ user });
  } catch (err) {
    res.send({ erro: 'usuario invalido' });
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

//update user
exports.user_update = async (req,res) =>{
  try{
    //to search in database, the user id who are inside the token
    const { _id } = await User.findById(req.userId);

    //to take id in route
    const user = req.params.UserId;

    //if user id in token are not equal to user in params, return not allowed
    if(_id!=user)
      res.status(400).send({error:'not allowed'});

    const { name, password, email } = req.body;

    //To find user and update email to null, in case of update the same email which was before
    await User.findByIdAndUpdate(user,{
      email:null
    });

    //in case of the new email already exists in another user
    if (await User.findOne({ email }))
      res.status(400).send({error:'email already exist'});

    //to see if one of the fields are equal to null or blank
    if (
      (name == "")||(name == null) ||
      (email == "") || (email == null) || 
      (password == "") || (password == null)
    )
      res.send({error:'verify fields again'});

    //update user with all fields
    const updatedUser = await User.findByIdAndUpdate(user, {
      name,
      email,
      password 
    },{ new: true });

    //return the user updated
    res.send(updatedUser)
  }catch(err){
    res.status(400).send({error:'Error updating user'});
    console.log(err)
  }
};

//logout
exports.user_logout = async (req,res)=>{
  try{
    const user = await User.findOne(req.UserId)
    const token = jwt.sign({id:user.id},
      authConfig.secret,{
        expiresIn:2
      }
      )
    res.send({token})

  }catch(err){
    console.log(err)
    res.status(400).send({error:'error'})
  }
  
}