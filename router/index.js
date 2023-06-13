const express = require('express');
const router = express.Router();
const homecontroler = require('../controller/hom-controler');


router.get('/' , homecontroler.home)
router.use('/user' , require('./user'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./like'));
router.use('/api', require('./api'))


console.log('router load');
module.exports = router;