import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app: express.Application = express.default();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  },
});

io.on("connection", async (socket) => {
  console.log("server id:", socket.id);

  socket.on("myevent", (data) => {
    console.log(data);
    socket.emit("responseEvent", 'Hello client!');
  })
});


httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
})
