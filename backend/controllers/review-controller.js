import Review from '../models/review-model.js';
import Deal from '../models/deal-model.js';

const getReviews = async (req, res) => {
    try {
        const user = req.user;
        const reviews = await Review.find({ user });
        if (reviews) res.json({ success: true, reviews });
        else res.json({ success: false, message: 'Reviews not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Error to fetch reviews.', error });
    }
};

const getDealReviews = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
            res.json({ success: false, message: 'Deal not found.' });
        }
        const reviews = await Review.find({ deal });
        res.json({ success: true, reviews });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch reviews.', error });
    }
};

const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const dealId = req.params.id;

        const deal = await Deal.findById(dealId);
        if (!deal) return res.status(404).json({ success: false, message: 'Deal not found' });

        const user = req.user;
        const alreadyReviewed = await Review.findOne({ $and: [{ deal, user }] });
        if (alreadyReviewed) return res.json({ success: false, message: 'Already Reviewed' });

        const review = await Review.create({
            user,
            username: user.username,
            deal,
            dealName: deal.name,
            image: deal.image,
            rating: Number(rating),
            comment,
        });
        if (review) res.json({ success: true, review });
        else res.json({ success: false, message: 'Error Occured in backend.' });
    } catch (error){
        res.json({ success: false, message: 'Failed to create review.', error });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(review) {
            await Review.findByIdAndDelete(req.params.id);
            res.json({ success: true, message: 'Review deleted.' });
        } else {
            res.json({ success: false, message: 'Review not found.' });
        }
    } catch (error) {
        res.json({ success: false, message: 'Failed to delete review.', error });
    }
};

export {
    getReviews,
    getDealReviews,
    createReview,
    deleteReview,
};
