import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { WebSocket } from 'ws';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
  },
});

const finhubSocket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.FINNHUB_API_KEY}`);

// Connection opened -> Subscribe
finhubSocket.addEventListener('open', () => {
    finhubSocket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    finhubSocket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    finhubSocket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
finhubSocket.addEventListener('message', (event) => {
  io.emit('message', event.data);
  // console.log('Message from server ', event.data);
});

// Unsubscribe
var unsubscribe = function(symbol: any) {
  finhubSocket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}
  
io.on("connection", async (socket) => {
  socket.on("message", (event) => {
    socket.emit('message', event);
    console.log('Message from server', event.data);
  })
});


httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
})
