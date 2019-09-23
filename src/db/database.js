const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, () =>{
    console.log('Conected to mongodb');
});
mongoose.Promise = global.Promise;

module.exports = mongoose