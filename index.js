import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io'

const app = express();
dotenv.config();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    console.log("Client Connected :", socket.id);

    setInterval(()=> {
        const data = {
            temperature: (Math.random() * 100).toFixed(2),
            humidity: (Math.random() * 100).toFixed(2),
            timestamp: new Date().toLocaleTimeString()
        };

        socket.emit('sensorData', data);
    }, 2000);
})

const PORT = process.env.PORT || 6050;

server.listen(PORT, ()=>{
    try {
        console.log("Server is running on " + PORT);
    } catch (err) {
        console.log(err);
    }
})