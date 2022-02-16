var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
var {users} = require('../prisma/table');

router.get('/',(req, res)=>{})
router.post('/',(req, res) => {
    users.create({
        data: {
            id: req.query.id,
            pw: req.query.pw,
            username: req.query.username
        }
    })
})
module.exports = router;