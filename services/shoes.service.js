const {shoes} = require('../prisma/table')

module.exports = {
    getAllShoes: async () => {
        const allShoes = await shoes.findMany();
        return allShoes;
    },
    getOneShoes: async (id) => {
        const slectedShoes = await shoes.findFirst({
            where: {
                id: Number(id)
            }
        })
        return slectedShoes
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
    },
    getDesignerShoes: async (name) => {
        return await shoes.findMany({
            where: {
                designer: name
            }
        })
    }
}