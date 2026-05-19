const { PrismaClient } = require("../../generated/prisma/client");

/** @type {PrismaClient} */
const prisma = new PrismaClient();

module.exports = prisma;