import { Router } from "express";
import { getDeals, getTrendingDeals, getDealByRegion, getDealByCity, getDealByActivity, getDealById, getDealByUser, createDeal, deleteDeal } from '../controllers/deal-controller.js';
import multer from 'multer';

const router = Router();

// routes
router.get('/get', getDeals);
router.get('/trending', getTrendingDeals);
router.get('/region/get', getDealByRegion);
router.get('/get/:id', getDealByCity);
router.get('/activity/get', getDealByActivity);
router.get('/:id', getDealById);
router.get('/hosted', getDealByUser);
router.post('/create-deal', createDeal);
router.delete('/delete/:id', deleteDeal);

// multer storage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

export default router;
