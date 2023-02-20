const {PrismaClient} = require('@prisma/client')
const {users, shoes, designer} = new PrismaClient();

module.exports = {users, shoes, designer}