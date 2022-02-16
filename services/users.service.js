const { users } = require("../prisma/table")

module.exports = {
    getAllusers: async() => {
        await users.findMany({orderBy:{id:'asc'}})
    }
}