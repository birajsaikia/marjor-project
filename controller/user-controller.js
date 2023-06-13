let User = require('../models/user');
let fs = require('fs');
let path = require('path');
let userMailer = require('../Mailer/user-mailer')

module.exports.home = function(req, res){
    return res.end('<h1>Euser profile</h1>')
}



module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

    return res.render('user_sign_up', {
        title: "codilal | sign up"
    })
}
module.exports.proFile = async function(req, res){

         User.findById(req.params.id , function(err, user){
            return res.render('profile', {
                    title: "User profile",
                    user: req.user,
                    profile_user: user
                })
         })      
                
            
            // return res.redirect('/user/signin')
}
// module.exports.Update = async function(req, res){
//     if(req.user.id == req.params.id){
//         let user = User.findByIdAndUpdate(req.params.id, req.body);
//         if(user){
//             return res.redirect('back');
//         }
//     }else{
//         return res.status(401).send('unathorize')
//     }
// }

module.exports.Update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         if(err){
    //             console.log(err)
    //         }
    //          return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('unathorize')
    // }

    if(req.user.id == req.params.id){
        try{
        let user = await User.findById(req.params.id);
         User.uploadedAvatar(req, res, function(err){
            if(err){
                console.log(err)
            }
            user.name = req.body.name;
            user.email = req.body.email;
            
            if(req.file){
                if(user.avatar){
                     fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                }
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }

            user.save();
            
            return res.redirect('back');

        })
    }catch(err){
        req.flash('error', err);
        console.log(err);
    }
    }else{
        return res.status(401).send('unathorize')
    }

}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

    return res.render('user_sign_in', {
        title: "codilal | sign in"
    })
}

module.exports.create = async function(req, res){
    if(req.body.password != req.body.conform_password){
        return res.redirect('back')
    }
    
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      User.create(req.body, function (err, user) {
        console.log(req.body);

        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/user/signin");
      });
    } else {
      return res.redirect("back");
    }


}
// module.exports.createSession = async function(req, res){
//     console.log(req.body)
//     let user = await User.findOne({ email: req.body.email });
//     //if user esist
//     console.log(user);
//     console.log(user.password, req.body.password);
//     if(user){

//         if(user.password != req.body.password){
//             return res.redirect('back');
//         }
//         res.cookie('user_id', user.id);
//         console.log(res.cookie);
//         return res.redirect("/user/profile")
//     }
//     else{
//         return res.redirect("back")
//     }
// }


module.exports.createSession = async function(req, res){
    req.flash('success', 'signup success');

    // let user = await User.findOne({ email: req.body.email });
    console.log(req.user);
    // user =  User.populate("user", "name email");
    // console.log(user);
    userMailer.newMailer(req.user);
    return res.redirect('/');
}

module.exports.destroyession = async function(req, res){
    req.logout(
        function(err){
            if(err){
                console.log(err);
            }
        }
    );
    req.flash('success', 'logout success');
    

    return res.redirect('/');
}
