let express = require('express');
let router = express.Router();
let password = require('passport');

let postcontroller = require('../controller/posts-controler');

router.post('/create', password.checkAuthentication, postcontroller.create);
router.get('/destroy/:id', password.checkAuthentication, postcontroller.destroy);

module.exports = router;