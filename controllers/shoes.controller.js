const shoeService = require('../services/shoes.service')

module.exports = {
    getAllShoes: (req, res) => {
        const allshoes = shoeService.getAllShoes();
        allshoes.then(data => {
            res.send(data);
        })
        
    },
    postShoes: (req, res) => {
        shoeService.addShoes()
        .then(() => console.log('shoes is added'))
        .catch(err => console.error(err))
        res.send(shoeService.getAllShoes())
    }
}