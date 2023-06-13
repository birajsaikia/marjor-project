let mongoose = require('mongoose');
let multer = require('multer');
let path = require('path');
let AVATAR_PATH = path.join('/uploads/users/avatArs')

let userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneN: {
        type: String,
        require: true
    },
    filename: {
        data: Buffer,
        Type: String
    },
    avatar: {
        type: String
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
    })


userschema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userschema.statics.avatarPath = AVATAR_PATH;



let User = mongoose.model('User', userschema)
module.exports = User;