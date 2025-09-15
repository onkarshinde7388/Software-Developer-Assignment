import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { login } from './middlewares/auth.js';
import dotenv from 'dotenv';
import route from './routes/route.js';
import { Server } from 'socket.io';
import http from 'http';
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',  // or your frontend URL
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.post("/login", login);
app.use("/", route);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));