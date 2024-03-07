'use client';

import React, {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";

export default function WebsocketCom() {
  const socket = useSocket();

  const [buttonSMS, setButtonSMS] = useState("Send event!");

  // the implementation of the socket connection
  // from the client-side
  useEffect(() => {
    if (!socket) {
      return;
    }
    // connection is successful => display socket id 
    socket.on("connect", () => {
      console.log("client id: ", socket.id);
    })

    socket.on("responseEvent", (data) => {
      setButtonSMS("Received response from the server:" + data);
      console.log(data);
    })

  }, [socket]);

  const sendSocketEvent= () => {
    socket?.emit('myevent', "Hello server!");
  }

  return (
    <>
      <button className="bg-orange-400" onClick={sendSocketEvent}>
        {buttonSMS}
      </button>
    </>
  )
}