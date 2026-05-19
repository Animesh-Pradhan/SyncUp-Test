const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma/client");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

module.exports = new PrismaClient({ adapter });