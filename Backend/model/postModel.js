const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    email: {
        type: String
    }
}, {timestamps: true})

const PostModel = mongoose.model('Post', postSchema)
module.exports = PostModel