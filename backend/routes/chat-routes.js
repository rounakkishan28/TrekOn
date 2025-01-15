import { Router } from "express";
import { accessChat, fetchChats } from '../controllers/chat-controller.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post('/:id', authMiddleware, accessChat);
router.get('/get', authMiddleware, fetchChats);

export default router;