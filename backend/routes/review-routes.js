import { Router } from "express";
import { getReviews, getDealReviews, createReview } from '../controllers/review-controller.js';

const router = Router();

router.post('/:id/create', createReview);
router.get('/:id/get', getDealReviews);
router.get('/get', getReviews);

export default router;
