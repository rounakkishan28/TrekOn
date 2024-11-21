import { Router } from "express";
import { signUp, signIn, updateUser, getDashboard } from "../controllers/user-controller.js";

const router = Router();

// routes
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.put('/update', updateUser);
router.get('/dashboard', getDashboard);

export default router;