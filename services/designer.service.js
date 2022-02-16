const { designer } = require('../prisma/table');

module.exports = {
    getAllDesigners : async() => {
        return await designer.findMany({
            orderBy: [{id: 'asc'}]
        });
    },
    addDesigner : async(name) => {
        await designer.create({
            data: {
                name: name
            }
        })
    },
    updateDesigner : async(id, name) => {
        await designer.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        })
    },
    deleteDesigner: async (id) => {
        await designer.delete({
            where: { id: id }
        })
    } 
}