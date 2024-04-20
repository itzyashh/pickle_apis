import './src/config/db.js';
import express from 'express';
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });

    socket.on('join room', (chatId) => {
        const room = chatId;
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on('chat message', (data) => {
        console.log('data received from FE: ' + data.chatId + ' ' + data.text);
        try {
            io.to(data.chatId).emit('chat message', data);
            console.log('message sent');
        } catch (error) {
            console.log('error in chat message', error);
        }

    })

});

const port = 3000;
import dotenv from 'dotenv';
dotenv.config();

import myRoutes from './src/routes/index.js';


app.use(express.json());


app.use('/', myRoutes);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);