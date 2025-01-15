import { Router } from "express";
import { allUsers, signUp, signIn, updatePassword, updatePic, getDashboard, getProfile, getUser } from "../controllers/user-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = Router();

// multer storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// routes
router.get('/get', authMiddleware, allUsers);
router.post('/register', upload.single("image"), signUp);
router.post('/login', signIn);
router.put('/forgot-password', updatePassword);
router.put('/update-pic', authMiddleware, upload.single("image"), updatePic);
router.get('/dashboard', authMiddleware, getDashboard);
router.get('/profile', authMiddleware, getProfile);
router.get('/:id', getUser);

export default router;