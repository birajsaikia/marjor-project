// s

let mongoose = require('mongoose');
let postschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postschema);
module.exports = Post;