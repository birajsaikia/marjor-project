let mongoose = require('mongoose');

let likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        enum: "onModel"
    },
    onModel: {
        type: String,
        required: true,
        enum:['Post', 'comment']
    },
},{
    timestamps: true
})
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;