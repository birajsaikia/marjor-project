const express = require('express');
const router = express.Router();

let userapi = require("../../../controller/api/v1/userapi");

router.post('/createsession', userapi.createSession);


module.exports = router;