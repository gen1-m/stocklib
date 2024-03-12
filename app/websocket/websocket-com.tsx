'use client';

import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

interface Trades {
  c: any, 
  s: string,
  p: number,
  t: number,
  v: number
}
 
export default function WebsocketCom() {
  const socket = useSocket();

  const [trades, setTrades] = useState<Trades[]>([]);

  // the implementation of the socket connection
  // from the client-side
  useEffect(() => {
    if (!socket) {
      return;
    }
    // connection is successful
    socket.on("connect", () => {
      console.log("Client connect!");
    });

    

    socket.on("message", (message) => {
      const res = JSON.parse(message);
      console.log(res);
      if (res.type == "trade") {
        setTrades((prevTrades: Trades[]) => [...prevTrades, ...res.data]);
      } 
    });

  }, [socket]);

  return (
    <>
      <h1>FinHub Trades</h1>
      <div>
        {trades.map((message: Trades) => (
          <>
            <p key={message.s} className="text-xl text-white">
              Message: {message.s}
            </p>
          </>
        ))}
      </div>
    </>
  )
}