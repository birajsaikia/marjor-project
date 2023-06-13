const Comment = require('../models/comment');
const Post = require('../models/Post');
const Like = require('../models/like');
const commentMailer = require('../Mailer/comment-mail');
const queue = require('../confic/kue');
const commentWorker = require('../worker/commentWorker');

// module.exports.create = function(req, res){
//     Post.findById(req.body.post, function(err, post){
//         console.log(err)
//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error

//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }
module.exports.create = async function(req, res){
    try{
        let post = await Post.findById( req.body.post )
        
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email');
            // commentMailer.newMailer(comment);
            let job =await queue.create('email', comment).save(function(err){
                if(err){console.log('error in create email',err); return;}
                
                console.log('job enquird', job.id);
            })

            res.redirect('/');
        }
    
    }catch(err){
        console.log(err)
    }
}

// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){

//             let postId = comment.post
//             comment.remove();

//             Comment.findByIdAndUpdate(postId, {$pull: {comment: req.params.id}, function(err, post){
//                 return res.redirect('back');
//                 console.log(err);
//             }
//         })
//         }else{
//             return res.redirect('back');
//         }
//     })
// }

// module.exports.destroy = async function(req, res){
//     try{
//     let comment = await Comment.findById(req.params.id)
//     console.log(comment); 
//     if(comment.user == req.user.id){

//             let postId = comment.post
//             await comment.remove();
//             await comment.save();
//             Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}, function(err, post){
//                 return res.redirect('back');
//                 // console.log(err);
//             }
//         })
//      }
//     }catch(err){
//         console.log(err);
//     }
// }

module.exports.destroy = async function (req, res) {
    try {

        let comment = await Comment.findById(req.params.id)
        console.log(comment);

        if (comment.user == req.user.id) {
            
            Like.deleteMany({likeable: comment, onModel:'comment'});

            let postId = comment.post
            await comment.remove();
            await comment.save();
            console.log("commnent delete successfully");
            // let post = await  Post.findById(postId);

            // await post.comments.$pull(req.params.id)
            Post.findByIdAndUpdate(postId, {$pull: { comments: req.params.id }, function(err, post) {
                    // if (err) {
                    //     console.log("err inside post delete :: ", err);
                    // }

                    return res.redirect('back');
                }

            })

        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}