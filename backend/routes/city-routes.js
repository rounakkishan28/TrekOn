import { Router } from "express";
import { getCities, addCity } from "../controllers/city-controller.js";
import multer from 'multer';

const router = Router();

// multer storage
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// routes
router.get('/get', getCities);
router.post('/add', upload.single("image"), addCity);

export default router;