const { users } = require("../prisma/table")

module.exports = {
    getAllusers: async() => {
        return await users.findMany({orderBy:{id:'asc'}})
    }
}