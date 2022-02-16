var express = require('express');
var path = require('path');
var router = express.Router();
var fs =require('fs')

const users = require('./users.route');
const shoes = require('./shoes.route');
const designer = require('./designer.route');
router.use('/users', users);
router.use('/shoes',shoes);
router.use('/designer',designer);

const shoesService = require('../services/shoes.service');
const designerService = require('../services/designer.service');
const userService = require('../services/users.service')

// router.get('/',(req, res) => res.sendFile(path.join(__dirname,'..','template','index.html')));
router.get('/', async (req,res) => {
    const allShoes =  await shoesService.getAllShoes()
    const allDesigners = await designerService.getAllDesigners()
    const allUSers = await userService.getAllusers();
    res.render(
            "../template/index.html",
            {
                allShoes,
                allDesigners,
                allUSers
            }
    )
})
// const imagefile = require('../public/images/shoes/shoe1.jpeg');
router.get('/image',function(req,res) {
    // res.sendFile('g');
    // const url = '../public/images/shoes/shoe1.jpeg';
    // res.set("Content-Type", "image/jpeg");
    res.sendFile(path.join(__dirname,"../public/images/shoes/shoe1.jpeg"));
})

const upload = require('../multer');





function filteredData(reqBody){
    var { 
        name, price, designer, description,
        color1, color2, color3, color4,
        size250, size255, size260, size265, size270, size275, size280
        
    } = reqBody;

    function filteringColors() {
        var colors = [color1, color2, color3, color4]
        var filteredColors = colors.filter(word => word.length != 0)
        return filteredColors;
    }
    function filteringSizes() {
        var sizes = [size250, size255, size260, size265, size270, size275, size280]
        var filteredSizes = [];
        sizes.map(size => {
            if(size[0] != 0)
            filteredSizes.push(Number(size[0]))    
        })
        return filteredSizes;
    }
    return {
        name, price, designer, description,
        filteringColors, filteringSizes
    }
}


router.post('/shoe/add', async (req,res) => {

    // console.log(req.files.image)
  // DB에 목록 추가하기
    var {
        name, price, designer, description,
        filteringColors, filteringSizes
    } = filteredData(req.body);
    
    const {shoes} = require('../prisma/table')
    await shoes.create({
        data : {
            name,
            description,
            price: Number(price),
            designer,
            colors : filteringColors(),
            sizes : filteringSizes(),
        }
    })
    // console.log("필터링 : " + filteringColors())
    // console.log("필터링 : " + filteringSizes())
    // 이미지 파일 이름으로 저장하기
    const imageFile = req.files.image;
    // const { mimetype } = imageFile;
    imageFile.mv(
        './public/images/shoes/' + name + '.jpg',
        (err) => {
            if(err) console.error(err);
            else console.log('uploaded')
        }
    )
    // 페이지 리로드
    res.redirect('/')

})

router.post('/shoes/update/:id', async (req,res) => {
    var {
        name, price, designer, description,
        filteringColors, filteringSizes
    } = filteredData(req.body);

    const {shoes} = require('../prisma/table')
    await shoes.update({
        where: {
            id: Number(req.params.id)
        },
        data : {
            name,
            description,
            price: Number(price),
            designer,
            colors : filteringColors(),
            sizes : filteringSizes(),
        }
    })
    const imageFile = req.files.image;
    try { 
        fs.unlinkSync('./public/images/shoes/' + req.query.name + '.jpg')
    } catch(err) {
        console.error(err)
    }
    imageFile.mv(
        './public/images/shoes/' + name + '.jpg',
        (err) => {
            if(err) console.error(err);
            else console.log('uploaded')
        }
    )
    // 페이지 리로드
    res.redirect('/')
})

router.post('/shoes/delete', async(req, res) => {
    const {shoes} = require('../prisma/table')
    await shoes.delete({where: {id: Number(req.query.id)}})
    
    try {
        fs.unlinkSync('./public/images/shoes/' + req.query.name + '.jpg')
    } catch(err) {
        console.error(err)
    }
    res.redirect('/')
})

module.exports = router;