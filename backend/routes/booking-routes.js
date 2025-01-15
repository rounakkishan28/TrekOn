import { Router } from "express";
import { bookDeal, getBookings, getBookingById } from '../controllers/booking-controller.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// routes
router.get('/:id/book', authMiddleware, bookDeal);
router.get('/get', authMiddleware, getBookings);
router.get('/:id', getBookingById);

export default router;
