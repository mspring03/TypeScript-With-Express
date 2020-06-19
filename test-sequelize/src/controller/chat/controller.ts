import * as http from "http";
import socketIO from "socket.io";

const server: http.Server = http.createServer();
const io: any = socketIO(server);

// io.on('connection', (socket) => {
//     socket.on('')

//     socket.on('disconnect', () => {
//         console.log('disconnected');
//     });
// })