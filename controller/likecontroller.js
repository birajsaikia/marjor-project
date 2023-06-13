let Like = require('../models/like');
let Post = require('../models/Post');
let Comment = require('../models/comment');
// const { link } = require('fs');
// const { error } = require('console');

module.exports.taggolelike = async(req, res)=>{
    try {
        console.log(req.query.type);
        let likeable;
        let deleter = false;

        if (req.query.type = 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        let likeExist = await Like.findOne({
            likeable : req.query.id,
            onModel: req.query.type,
            user:req.user._id
        })

        if(likeExist){
            likeable.likes.pull(likeExist._id);
            likeable.save();
            likeExist.remove();
        }else{
            let newlike = await Like.create({
                user:req.user._id,
                likeable : req.query.id,
                onModel: req.query.type
            
            })
            likeable.likes.push(newlike._id);
            likeable.save();
        }

        return res.redirect('back')
    } catch (err) {
        console.log("error in like in post: ", err)
    }
    

}