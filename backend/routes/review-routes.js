import { Router } from "express";
import { getReviews, getDealReviews, createReview, deleteReview } from '../controllers/review-controller.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post('/:id/create', authMiddleware, createReview);
router.get('/:id/get', getDealReviews);
router.get('/get', authMiddleware, getReviews);
router.delete('/delete/:id', deleteReview);

export default router;
