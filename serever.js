// Install dependencies: npm install express socket.io
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};

app.use(express.static("public")); // Serve static files

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
    players[socket.id] = 0;

    io.emit("update", players);

    socket.on("click", () => {
        players[socket.id]++;
        io.emit("update", players);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
        delete players[socket.id];
        io.emit("update", players);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
