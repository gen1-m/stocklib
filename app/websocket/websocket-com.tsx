"use client";

import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import StockChart from "./stock-chart";
import type { Trade } from "@/types/globals";

export default function WebsocketCom() {
  const socket = useSocket();
  
  const [trades, setTrades] = useState<Trade[]>([]);
    
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
      // console.log(res);
      if (res.type == "trade") {
        setTrades((prevTrades: Trade[]) => [...prevTrades, ...res.data]);
      } 
    });
    
  }, [socket]);

  return (
    <>
      <h1>FinHub Trades</h1>
      <div>
        {trades.map((message: Trade, index: number) => (
          <div key={index}>
            <p className="text-xl text-white">
              {/* Message: {message.s} */}
            </p>
          </div>
        ))}
      <StockChart trades={trades} />
      </div>
    </>
  )
}


