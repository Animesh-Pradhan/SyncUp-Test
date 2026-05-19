const express = require("express");
const cors = require("cors");
const http = require("http")
const { Server } = require("socket.io")
require("dotenv").config()

const { setIO } = require("./config/socket")

const allowedOrigins = [process.env.FRONTEND_URL]
const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
})
setIO(io);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Cors Error: This origin is not allowed"))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id)

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id)
    })
})

app.use(express.json())

app.use("/feeds", require("./feeds/feeds.route"));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hi..."
    })
})

const port = 4000;
server.listen(port, () => console.log(`http://localhost:${port}`))