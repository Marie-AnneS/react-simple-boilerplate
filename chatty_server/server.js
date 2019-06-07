const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid/v4");
const PORT = 3001;

const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () => console.log(`Listening on ${PORT}`));

const wsServer = new SocketServer({ server });

wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    client.send(data);
  });
};

wsServer.on("connection", wsClient => {
  console.log("Client connected - total clients :", wsServer.clients.size);
  let nbClient = wsServer.clients.size;

  wsServer.broadcast(
    JSON.stringify({
      type: "postNbUser",
      nbClient: nbClient
    })
  );

  wsClient.on("message", message => {
    const getObj = JSON.parse(message)
    getObj.id = uuidv4();

    switch (getObj.type) {
      case "postMessage":
        getObj.type = "incomingMessage";

        break;
      case "postNotification":
        getObj.type = "incomingNotification";
        break;

      default:
        throw new Error("Unknown event type " + getObj.type);
    }
    wsServer.broadcast(JSON.stringify(getObj));
  });

  wsClient.on("close", () => {
    nbClient = wsServer.clients.size;
    console.log("Client disconnected - total clients :", wsServer.clients.size)

    wsServer.broadcast(
      JSON.stringify({
        type: "postNbUser",
        nbClient: nbClient
      })
    );
  });
});
