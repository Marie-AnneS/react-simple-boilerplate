// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid/v4");
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const ws = new SocketServer({ server });

ws.broadcast = function broadcast(data) {
  ws.clients.forEach(function each(client) {
    client.send(data);
  });
};

ws.on("connection", wsClient => {
  console.log("Client connected - total clients :", ws.clients.size);
  const nbClient = ws.clients.size;

  ws.broadcast(
    JSON.stringify({
      type: "postNewsUser",
      nbClient: nbClient
    })
  );

  wsClient.on("message", message => {
    const msg = JSON.parse(message)
    msg.id = uuidv4();

    switch (msg.type) {
      case "postMessage":
        msg.type = "incomingMessage";

        break;
      case "postNotification":
        msg.type = "incomingNotification";
        break;

      default:
        throw new Error("Unknown event type " + msg.type);
    }
    ws.broadcast(JSON.stringify(msg));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  wsClient.on("close", () => console.log("Client disconnected"));
});
