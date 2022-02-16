const { shoes } = require('../prisma/table');



module.exports = {
    getAllShoes: async () => {
        const allShoes = await shoes.findMany();
        return allShoes;
    },
    addShoes: async (
        name,price,designer,description
    ) => {
        await shoes.create({
            data: {
                name,
                price,
                designer,
                colors : ['white', 'black', 'yellow'],
                sizes: [260, 265, 270, 275, 280, 285],
                description: 'best famous shoes',
            }
        })
    },
    updateShoes : async(id) => {
        await shoes.update({
            where: {
                id: id
            },
            data : {

            }
        })
    }
}