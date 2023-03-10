const shoesService = require('../services/shoes.service');
const shoeService = require('../services/shoes.service')

module.exports = {
    getAllShoes: (req, res) => {
        const allshoes = shoeService.getAllShoes();
        allshoes.then(data => {
            res.send(data);
        })
        
    },
    getOneShoes: (req, res) => {
        if(req.params?.id != undefined) {
            shoeService
            .getOneShoes(req.params.id)
            .then(
                data =>
                res.send(data)
                )
            } else {
                res.send("id is null")
            }
    },
    postShoes: (req, res) => {
        shoeService.addShoes()
        .then(() => console.log('shoes is added'))
        .catch(err => console.error(err))
        res.send(shoeService.getAllShoes())
    },
    getDesignerShoes: (req, res) => {
        shoesService.getDesignerShoes(req.query.name)
            .then(result => res.send(result))
    }
}