const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

function sendBroadcastMessage(socket, msg) {
    // socket.broadcast.emit(msg);
    socket.emit("announcements", { message: msg });
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
    setTimeout(() => sendBroadcastMessage(socket, "msg1"), 1000);
    setTimeout(() => sendBroadcastMessage(socket, "msg2"), 2000);
    setTimeout(() => sendBroadcastMessage(socket, "msg3"), 3000);
    setTimeout(() => sendBroadcastMessage(socket, "end"), 4000);
    setTimeout(() => sendBroadcastMessage(socket, "msg4"), 5000);
});

server.listen(4000, () => {
    console.log("listening on *:4000");
});
