let Post = require('../models/Post')
let User = require('../models/user')
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie("user_id", 25)
    // return res.render('home',{
    //     title: "home"
    // })

    // Post.find({}, function(err, posts) {
    //     return res.render('home',{
    //             title: "home",
    //             posts: posts
    //         })
        
    // })
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes'
        }
    })
    .populate('likes')
    .exec(function(err, posts) {
        User.find({}, function(err, users){
            return res.render('home',{
                title: "home",
                posts: posts,
                all_users: users
            })
        })
        
        
    })
}