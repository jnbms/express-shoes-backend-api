var express = require('express');
var router = express.Router();
var service = require('../services/designer.service');

router.get('/',async (req, res) => {
     await service.getAllDesigners().then(data => {
        res.send(data)
    })
})

router.post('/add',async (req, res) => {
    await service.addDesigner(req.body.designer);
    res.redirect('/')
})

router.post('/update/:id',async (req,res) => {
    await service.updateDesigner(Number(req.params.id), req.body.designer);
    res.redirect('/');
})

router.post('/delete/:id', async(req,res) => {
    await service.deleteDesigner(Number(req.params.id));
    res.redirect('/');
})

module.exports = router;