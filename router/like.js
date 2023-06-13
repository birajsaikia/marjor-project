let express = require('express');
let router = express.Router();
let password = require('passport');

let likecontroller = require('../controller/likecontroller');

router.get('/toggle', likecontroller.taggolelike);

module.exports = router;