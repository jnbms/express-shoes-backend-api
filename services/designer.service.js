const { designer } = require('../prisma/table');

module.exports = {
    getAllDesigners : async() => {
        return await designer.findMany({
            orderBy: [{id: 'asc'}]
        });
    },
    addDesigner : async(info) => {
        let {name, slogan, coment} = info
        await designer.create({
            data: {
                name,
                slogan,
                coment
            }
        })
    },
    updateDesigner : async(id, info) => {
        let {name, slogan, coment} = info
        await designer.update({
            where: {
                id: id
            },
            data: {
                name, slogan, coment
            }
        })
    },
    deleteDesigner: async (id) => {
        await designer.delete({
            where: { id: id }
        })
    } 
}