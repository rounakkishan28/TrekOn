import { Router } from "express";
import { bookDeal, getBookings, getBookingById } from '../controllers/booking-controller.js';

const router = Router();

// routes
router.post('/book', bookDeal);
router.get('/get', getBookings);
router.get('/:id', getBookingById);

export default router;
