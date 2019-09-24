const mongoose = require('../../db/database');

const CommentsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rank:{
        type:Number,
        required:true,
        default:0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Comments', CommentsSchema)