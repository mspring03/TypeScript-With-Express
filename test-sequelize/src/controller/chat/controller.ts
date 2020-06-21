import * as http from "http";
import socketIO from "socket.io";
import { timeStamp } from "console";

const User = require('./user.query');
const Room = require('./room.query');
const Message = require('./message.query');
const server: http.Server = http.createServer();
const io: any = socketIO(server);

let userInfo: object = new Object;

io.on('connection', (socket) => {
    socket.on('first', token => {
        const user = User.oneUserFindByToken(token); 
        userInfo[socket.id].u_id = user.u_id;
        userInfo[socket.id].userId = user.userId;
        userInfo[socket.id].connection = user.connection;
        userInfo[socket.id].name = user.name;
        userInfo[socket.id].token = token;

        User.changeConnection(userInfo['userId'], userInfo[socket.id].connection);
    });

    io.to(socket.id).emit('showRoom', Room.showRoom(userInfo[socket.id].u_id));

    socket.on('createRoom', roomName => {
        Room.createRoom(userInfo[socket.id].u_id, userInfo[socket.id].userId, roomName);
    });

    io.to(socket.id).emit('showUser', User.showUser());
    
    socket.on('enterRoom', r_id => {
        socket.join(r_id);
        socket.emit('joinRoom', userInfo[socket.id].name);
        io.to(socket.id).emit('LastTimeChat', Message.tenChat(r_id)); 
        Message.create(
            userInfo[socket.id].u_id, 
            r_id, 
            `${userInfo['name']}님이 입장하셨습니다.`,
            userInfo[socket.id].profile_img,
            timeStamp(),
            userInfo[socket.id].name
        );
        io.sockets.in(r_id).emit('getMessage', Message.lastchat(r_id));    
    });

    socket.on('inviteUser', (u_id, r_id) => {
        const findUser: any = User.allUserFindById(u_id);
        Room.userInvite(u_id, r_id, findUser.userId, findUser.name);
    });

    socket.on('sendMessage',(r_id, message) => {
        Message.create(
            userInfo[socket.id].u_id, 
            r_id, 
            `${message}`,
            userInfo[socket.id].profile_img,
            timeStamp(),
            userInfo[socket.id].name
        );
        io.sockets.in(r_id).emit('getMessage', Message.lastchat(r_id));
    });

    socket.on('outRoom', r_id => {
        Message.create(
            userInfo[socket.id].u_id, 
            r_id, 
            `${userInfo[socket.id].name}님이 퇴장하셨습니다.`,
            userInfo[socket.id].profile_img,
            timeStamp(),
            userInfo[socket.id].name
        );
        io.to(socket.id).emit('LastTimeChat', Message.tenChat(r_id));
        socket.leave(r_id);
        io.to(socket.id).emit('showRoom', Room.showRoom(userInfo[socket.id].u_id));
    });

    socket.on('deleteRoom', r_id => {
        Room.Delete(r_id);
    });

    socket.on('disconnect', () => {
        delete userInfo[socket.id];
    });
})