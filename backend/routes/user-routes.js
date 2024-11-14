import { Router } from "express";
import { signUp, signIn, changeBio, getDashboard } from "../controllers/user-controller.js";

const router = Router();

// routes
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.put('/change-bio', changeBio);
router.get('/dashboard', getDashboard);

export default router;