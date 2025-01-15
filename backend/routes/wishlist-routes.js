import { Router } from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishListController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// routes
router.post('/:id/add', authMiddleware, addToWishlist);
router.delete('/:id/remove', authMiddleware, removeFromWishlist);
router.get('/get', authMiddleware, getWishlist);

export default router;