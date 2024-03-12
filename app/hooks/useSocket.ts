import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io("http://35.246.249.132:5000"));
    return () => {
      socket?.disconnect();
    };
  }, []);
  return socket;
}