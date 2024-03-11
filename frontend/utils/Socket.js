import { io } from "socket.io-client";

const socket = io('https://chat-application-gi09.onrender.com', {
      withCredentials: true,
      // autoConnect:false // Ensure to include credentials when making requests
    });

export default socket;
