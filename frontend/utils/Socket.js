import { io } from "socket.io-client";

const socket = io('https://chat-application-gi09.onrender.com', {
      withCredentials: true,
      // autoConnect:false // Ensure to include credentials when making requests
    });

// const socket = io('http://localhost:8080', {
//       withCredentials: true,
//       // autoConnect:false // Ensure to include credentials when making requests
//     });

export default socket;
