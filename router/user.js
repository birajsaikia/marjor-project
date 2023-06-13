const express = require('express');
const router = express.Router();
const Usercontroler = require('../controller/user-controller');
const passport = require('passport');


router.get('/' , Usercontroler.home)

router.get('/profile/:id', 
passport.checkAuthentication, 
Usercontroler.proFile)

router.post('/update/:id', 
passport.checkAuthentication, 
Usercontroler.Update)

router.get('/signup', Usercontroler.signUp);
router.get('/signin', Usercontroler.signIn);

router.post('/create',  Usercontroler.create);




router.post('/createsession',
 passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
) ,
Usercontroler.createSession)

router.get('/signout', Usercontroler.destroyession)

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/signin'}), Usercontroler.createSession);


console.log('user router load');
module.exports = router;