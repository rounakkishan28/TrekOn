import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import nodemailer from 'nodemailer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import userRoutes from './routes/user-routes.js';
import dealRoutes from './routes/deal-routes.js';
import messageRoutes from './routes/message-routes.js';
import cityRoutes from './routes/city-routes.js';
import bookingRoutes from './routes/booking-routes.js';
import wishlistRoutes from './routes/wishlist-routes.js';
import reviewRoutes from './routes/review-routes.js';
import Message from './models/message-model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// load environment variables
dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// middleware
app.use(json());
app.use(cors());

// routes
app.use('/api/user', userRoutes);
app.use('/api/deal', dealRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/review', reviewRoutes);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'dist')));
  app.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_TO,
    pass: process.env.EMAIL_PASS,
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    to: process.env.EMAIL_TO,
    subject: `New message from ${name}`,
    html: `You received a new message from your contact form: \n\nName: ${name} \nEmail: ${email} \nMessage: ${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) res.json({ success: false, message: 'Error sending message.' });
    res.json({ success: true, message: 'Message Sent.' });
  });
});

// Socket.IO events
io.on('connection', (socket) => {
  console.Console('User connected: ', socket.id);

  // Handle joining a room for messaging
  socket.on('join-room', async (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);

    // Fetch previous messages for the room and send to the user
    const prevMessages = await Message.find({ room }).sort({ createdAt: 1 }).limit(50);

    // Send previous messages to the client
    socket.emit('previous-messages', prevMessages);
  });

  // Handle receiving and broadcasting a message to a room
  socket.on('send-message', async ({ room, sender, content }) => {
    // Save message to MongoDB
    const message = new Message({ room, sender, content });
    await message.save();

    // Broadcast message to other user in the room
    io.to(room).emit('receive-message', message);
    console.log(`Message from ${socket.id} in room ${room}:`, content);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// running server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

export default app;