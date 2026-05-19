require("dotenv").config()
const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', err => console.log('Redis Client Error', err));

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("REDIS Connected...")
    } catch (error) {
        console.log("REDIS Error:", error)

    }
}

connectRedis();

module.exports = redisClient;