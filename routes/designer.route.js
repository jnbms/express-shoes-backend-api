var express = require('express');
var router = express.Router();
var service = require('../services/designer.service');
var fs = require('fs');
var path = require('path')

router.get('/',async (req, res) => {
    await service.getAllDesigners().then(data => {
        res.send(data)
    })
})
router.get('/image/:name', async(req, res) => {
    // var sizeOf = require('image-size')
    res.set("Content-Type", "image/jpeg");
    // console.log(sizeOf('./public/images/designers/' + req.params.name + '.jpg'))
    res.sendFile(path.resolve('./public/images/designers/' + req.params.name + '.jpg'), (err) => {
        if(err) {
            console.log(err)
            // 파일이 없을 경우, 에러 콜백이 없으면 시스템이 멈춰버린다
            res.send()
        }
    })
})

router.post('/add',async (req, res) => {
    const name = req.body.name
    const image = req.files.image
    await service.addDesigner(req.body);
    await image.mv(
        './public/images/designers/' + name + '.jpg',
        (err) => {
            if(err) console.error(err);
            else console.log('uploaded')
        }
    )
    res.redirect('/')
})

router.post('/update/:id',async (req,res) => {
   
    var name = req.body.name
    await service.updateDesigner(Number(req.params.id), req.body);
    if(req.files?.image != undefined) {
        //remove
        try { 
            fs.unlinkSync('./public/images/designers/' + req.query.oldname + '.jpg')
        } catch(err) {
            console.error('삭제 실패')
        }
        //add new image
        let image = req.files.image
        await image.mv(
            './public/images/designers/' + name + '.jpg',
            (err) => {
                if(err) console.error(err);
                else console.log('uploaded')
            })
    } else {
        // rename image
        fs.rename(
            './public/images/designers/' + req.query.oldname + '.jpg',
            './public/images/designers/' + name + '.jpg',
            (err) => console.log(err)
            )
        console.log('rename')
    }
    res.redirect('/')
})

router.post('/delete/:id', async(req,res) => {
    try { 
        fs.unlinkSync('./public/images/designers/' + req.query.oldname + '.jpg')
    } catch(err) {
        console.error(err)
    }

    await service.deleteDesigner(Number(req.params.id));
    res.redirect('/');
})

module.exports = router;