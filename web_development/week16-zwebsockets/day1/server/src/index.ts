import http from "http";
import { WebSocket, WebSocketServer } from "ws";

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(new Date().toLocaleString() + "\tserver got http request...");
  res.writeHead(200, "OK");
  res.end("hi your are on localhost:4000 http server\n");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("\nnew websocket connection established...");

  ws.on("message", (data, isBinary) => {
    console.log(
      `recieved new message: ${data.toString()}. broadcasting to all clients...`,
    );

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(4000, () => {
  console.log(new Date().toLocaleString() + "\tserver listening on port:4000");
});
