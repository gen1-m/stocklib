"use client";

import React, { useEffect, useState } from "react";
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
    });

    socket.on("responseEvent", (data) => {
      setButtonSMS("Received response from the server:" + data);
    });

    // this is for when the client wants to use another page
    // or when the client just leaves from the site alltogether
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendSocketEvent = () => {
    socket?.emit("myevent", "Hello server!");
  };

  return (
    <>
      <button className="m-7" onClick={sendSocketEvent}>
        <div className="p-2 rounded-xl bg-orange-400 text-black">
          {buttonSMS}
        </div>
      </button>
    </>
  );
}
