var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users.controller');
var {users} = require('../prisma/table');

router.get('/',(req, res)=>{
    users.findMany({orderBy:{id: 'asc'}}).then(result => res.json(result))
})
router.get('/check',(req,res) => {
    users.findFirst({
        where: {
            id : req.query.id,
            pw: req.query.pw
        }
    })
    .then( result => {
        if(result) {
            res.send(result)
        } else {
            res.send(false)
        }
    })
})

router.get('/duplicate_check/:id',(req, res) => {
    users.findFirst({
        where: {
            id: req.params.id
        }
    })
    .then( result => {
            if(result) {
                res.send("중복된 계정이 있습니다.")
            } else {
                res.send('중복된 계정이 없습니다.')
            }
        }
    )
})

router.post('/',(req, res) => {
    users.create({
        data: {
            id: req.query.id,
            pw: req.query.pw,
            username: req.query.username
        }
    })
    .then(result => res.send(true))
    .catch(err => res.send(false))
    // console.log('됨?')
    // res.send('됨')
})
router.delete('/all',(req,res) => {
    users.deleteMany()
    .then(result => res.send(result))
})
module.exports = router;