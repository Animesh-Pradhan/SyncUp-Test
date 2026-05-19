const express = require("express");
const prisma = require("../config/prisma");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server Running"
    })
})

router.post("/", (req, res) => {
    try {
        const { message } = req.body;
        prisma.feed.create({ message: "HI" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, message: "Internal Server Error" })
    }
})

module.exports = router;