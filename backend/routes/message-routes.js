import { Router } from "express";
import { getMessages, sendMessage } from '../controllers/message-controller.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get('/:chatId', authMiddleware, getMessages);
router.post('/send', authMiddleware, sendMessage);

export default router;
