var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');

router.get('/', (req, res) => {
    res.send(UserController.getUsers)
});

module.exports = router;
