"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const server = http_1.default.createServer((req, res) => {
    console.log(req.url);
    console.log(new Date().toLocaleString() + "\tserver got http request...");
    res.writeHead(200, "OK");
    res.end("hi your are on localhost:4000 http server\n");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", (ws) => {
    console.log("\nnew websocket connection established...");
    ws.on("message", (data, isBinary) => {
        console.log(`recieved new message: ${data.toString()}. broadcasting to all clients...`);
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});
server.listen(4000, () => {
    console.log(new Date().toLocaleString() + "\tserver listening on port:4000");
});
