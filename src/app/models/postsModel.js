const mongoose = require('../../db/database');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Posts', PostSchema)