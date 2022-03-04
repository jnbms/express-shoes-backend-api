var express = require('express');
var router = express.Router();
var path = require('path')
// controller
const controller = require('../controllers/shoes.controller');

router.get('/', controller.getAllShoes)
router.post('/add', controller.postShoes)
router.get('/designer', controller.getDesignerShoes)

router.get('/image/:name',(req, res) => {
    res.set("Content-Type", "image/jpeg");
    res.sendFile(path.resolve('./public/images/shoes/' + req.params.name + '.jpg'))
})

router.get('/:id', controller.getOneShoes)

module.exports = router;
