import { Router } from "express";
import multer from 'multer';
import { getDeals, getTrendingDeals, getDealByRegion, getDealByCity, getDealByActivity, getDealById, getDealByUser, createDeal, deleteDeal } from '../controllers/deal-controller.js';
import authMiddleware from "../middleware/authMiddleware.js";

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
router.get('/get', getDeals);
router.get('/trending', getTrendingDeals);
router.get('/region/:id', getDealByRegion);
router.get('/get/:id', getDealByCity);
router.get('/activity/:id', getDealByActivity);
router.get('/deal/:id', getDealById);
router.get('/hosted-deal', authMiddleware, getDealByUser);
router.post('/create-deal', upload.single("image"), authMiddleware, createDeal);
router.delete('/delete/:id', deleteDeal);

export default router;
