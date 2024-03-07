import {io} from 'socket.io-client';

const socket = io('http://localhost:8080', {
  withCredentials: true, // Ensure to include credentials when making requests
});

export default socket;