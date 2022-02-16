var express = require('express');
var router = express.Router();
// controller
const controller = require('../controllers/shoes.controller');

router.get('/', controller.getAllShoes)
router.post('/add', controller.postShoes)


module.exports = router;
