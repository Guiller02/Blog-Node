//imports
const express = require('express');

const bodyParser = require('body-parser');

const postsRoutes = require('./app/routes/posts');

const userRoutes = require('./app/routes/user');


//express
const app = express();

//middlewares
app.use(bodyParser.json());

//Routes
app.use('/posts',postsRoutes);

app.use('/auth',userRoutes);

app.listen(3000);