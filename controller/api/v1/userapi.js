let User = require('../../../models/user');
let jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let users = await User.findOne({email: req.body.email});
        if(!users){
            return res.json(422,{
                message: "invaild user and password"
            })
        }
        res.json(200,{
            message: "take get succsessfully",
            data: {
                token: jwt.sign(users.toJSON(),'codial',{expiresIn: "100000"})
            }
        })
    }catch(err){
        console.log(err);
    }
}