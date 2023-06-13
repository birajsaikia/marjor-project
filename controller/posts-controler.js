let Post = require("../models/Post");
let Comment = require('../models/comment');
let Like = require("../models/like")

module.exports.create = async function(req, res) {
    try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    })
    await post.populate('user');
    if(req.xhr){
        console.log('hiii');
        return res.status(200).json({
            date:{
                post: post
            },
            massage: "Post created"
        })
    }
        req.flash('success', 'post create successfully')
        return res.redirect('back')
    }catch(err){
        console.log(err);
        return res.redirect('back')
    }
    
}

module.exports.destroy =async function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){

            Like.deleteMany({likeable: post, onModel:'Post'});
            Like.deleteMany({_id: {$in: post.comments}});

            req.flash('success', 'post delated successfully')
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                req.flash('error', err)
                return res.redirect('back');
            })
        }else{
            req.flash('error', 'post cannot delated')
            return res.redirect('back');
        }
    })
}