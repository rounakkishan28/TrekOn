import Review from '../models/review-model.js';
import Deal from '../models/deal-model.js';
import User from '../models/user-model.js';

const getReviews = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const reviews = await Review.find({ user });
        if (reviews) res.json({ success: true, reviews });
        res.json({ success: false, message: 'Reviews not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Error to fetch reviews.', error });
    }
};

const getDealReviews = async (req, res) => {
    const dealId = req.params.id;

    const deal = await Deal.findById(dealId);
    if (!deal) {
        res.status(404);
        throw new Error('Deal not found');
    }

    const reviews = await Review.find({ deal: dealId });
    res.status(200).json(reviews);
};

const createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const dealId = req.params.id;

    const deal = await Deal.findById(dealId);
    if (!deal) {
        res.status(404).json({ success: false, message: 'Deal not found' });
        throw new Error('Deal not found');
    }

    const alreadyReviewed = await Review.findOne({ deal: dealId, user: req.user._id });
    if (alreadyReviewed) {
        res.json({ success: false, message: 'Already Reviewed' });
    }

    const review = new Review({
        deal: dealId,
        user: req.user._id,
        rating: Number(rating),
        comment,
    });

    await review.save();

    deal.numReviews = deal.numReviews + 1;
    deal.rating = (deal.rating * (deal.numReviews - 1) + rating) / deal.numReviews;

    await deal.save();

    res.status(201).json({ success: true, message: 'Review added' });
};


export {
    getReviews,
    getDealReviews,
    createReview,
};
