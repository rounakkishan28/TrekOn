import { Router } from "express";
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishListController.js';

const router = Router();

// routes
router.post('/add', addToWishlist);
router.delete('/remove', removeFromWishlist);
router.get('/get', getWishlist);

export default router;