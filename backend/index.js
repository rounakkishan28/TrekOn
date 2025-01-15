import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import nodemailer from 'nodemailer';
import connectDB from './config/db.js';
import userRoutes from './routes/user-routes.js';
import dealRoutes from './routes/deal-routes.js';
import messageRoutes from './routes/message-routes.js';
import chatRoutes from './routes/chat-routes.js'
import cityRoutes from './routes/city-routes.js';
import bookingRoutes from './routes/booking-routes.js';
import wishlistRoutes from './routes/wishlist-routes.js';
import reviewRoutes from './routes/review-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const parentDir = resolve(__dirname, '..');

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/deal', dealRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/review', reviewRoutes);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  app.use(express.static(resolve(parentDir, 'frontend', 'dist')));
  res.sendFile(resolve(parentDir, 'frontend', 'dist', 'index.html'));
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    html: `
      <p>You received a new message from your contact form:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ success: false, message: 'Error sending message.', error });
    }
    res.json({ success: true, message: 'Message Sent.' });
  });
});

// Running server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import { Server } from 'socket.io';

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://trek-on-nzvd.vercel.app",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    if(!user || !user._id) return console.log('Invalid user data.');
    socket.join(user._id);
    socket.emit("connected");
    console.log("Connected to socket.io");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat || !chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

export default app;
