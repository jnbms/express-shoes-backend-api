var express = require('express');
var router = express.Router();

const users = require('./users.route');
router.use('/users', users);

module.exports = router;