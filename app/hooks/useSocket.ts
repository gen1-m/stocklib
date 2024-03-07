import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    return () => {
      socket?.disconnect();
    };
  }, []);
  return socket;
}