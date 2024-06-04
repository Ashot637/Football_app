import { useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";
import { BASE_URL } from "../axios/axios";

export let socket = io("https://ballhola.app");

const useSocket = () => {
  const { user } = useSelector(selectAuth);
  useEffect(() => {
    if (user) {
      // socket = io("https://ballhola.app");
      socket.on("connect", () => {});

      socket.emit("user-connected", user.id);

      socket.on("disconnect", () => {});
    }

    return () => {
      if (user) {
        socket.emit("user-disconnected", user.id);
        socket.disconnect();
      }
    };
  }, [user?.id]);

  return null;
};

export default useSocket;
