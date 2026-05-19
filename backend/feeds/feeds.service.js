const prisma = require("../config/prisma");
const redisClient = require("../config/redis");
const { getIO } = require("../config/socket")

const cacheKey = "Feeds";

const addFeed = async ({ message }) => {
    const data = await prisma.feed.create({ data: { message } });
    await redisClient.del(`${cacheKey}:AllFeeds`);

    const io = getIO();
    io.emit("new-feed", data);
}

const getAllFeeds = async () => {
    const cachedFeeds = await redisClient.get(`${cacheKey}:AllFeeds`);

    if (cachedFeeds) {
        return JSON.parse(cachedFeeds);
    }

    console.log("No Cache found. Making DB request");


    const data = await prisma.feed.findMany({ orderBy: { createdAt: "desc" } });
    await redisClient.set(`${cacheKey}:AllFeeds`, JSON.stringify(data), { EX: 300 });
    return data;
}

module.exports = { addFeed, getAllFeeds }