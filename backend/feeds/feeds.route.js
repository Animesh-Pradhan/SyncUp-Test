const express = require("express");
const prisma = require("../config/prisma");
const { addFeed, getAllFeeds } = require("./feeds.service");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await getAllFeeds();
        return res.status(200).json({ status: 1, message: "Feeds fetched successfully", data })
    } catch (error) {
        console.log("Error | GET | Get-All-Feeds", error);
        return res.status(500).json({ status: 0, message: "Internal Server Error" })
    }
})

router.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) return res.status(400).json({ status: 0, message: "Message is required" })
        if (typeof message !== "string") return res.status(400).json({ status: 0, message: "Message must be a string" })
        const trimmedMessage = message?.trim()
        if (trimmedMessage.length === 0) return res.status(400).json({ status: 0, message: "Message cannot be empty" })

        await addFeed({ message: trimmedMessage });

        return res.status(201).json({ status: 1, message: "Feed added successfully" })
    } catch (error) {
        console.log("Error | POST | Add-Feeds", error);
        return res.status(500).json({ status: 0, message: "Internal Server Error" })
    }
})

module.exports = router;