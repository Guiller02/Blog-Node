//imports
const express = require('express');

const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');

//express
const app = express();

//middlewares
app.use(bodyParser.json());

//Routes
app.use('/posts',postsRoutes);

app.listen(3000);