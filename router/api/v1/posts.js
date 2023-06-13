const express = require('express');
const router = express.Router();

let postsApi = require("../../../controller/api/v1/postapi");
const passport = require('passport');

router.get('/', postsApi.index);

router.delete('/:id',passport.authenticate("jwt", {session: false}), postsApi.destroy)



module.exports = router;