import fs from 'fs';
import Deal from '../models/deal-model.js';
import User from '../models/user-model.js';
import City from '../models/city-model.js';
import Review from '../models/review-model.js';

// Get deals
const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find({});
        if (deals) res.json({ success: true, deals });
        res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals.', error });
    }
};

// trending deals
const getTrendingDeals = async (req, res) => {
    try {
        const trendingDeals = await Review.aggregate([
            { $group: { _id: "$deal", reviewCount: { $sum: 1 } } },
            { $sort: { reviewCount: -1 } },
            { $limit: 12 },
            { $lookup: { from: "deals", localField: "_id", foreignField: "_id", as: "dealInfo" } },
            { $unwind: "$dealInfo" },
            { $project: { _id: 0, dealId: "$_id", reviewCount: 1, dealInfo: 1 } }
        ]);
        if(trendingDeals) res.json({ success: true, trendingDeals });
        else res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals.', error });
    }
};

// Get deals by region
const getDealByRegion = async (req, res) => {
    try {
        const { region } = req.body;
        const deals = await Deal.find({ region: region });
        if (deals) res.json({ success: true, deals });
        res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals by region.', error });
    }
};

// Get deals in a particular city
const getDealByCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        const cityName = city.name;
        const cityCountry = city.country;
        const deals = await Deal.find({ city: req.params.id });
        res.json({ success: true, deals, cityName, cityCountry });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals by city.', error });
    }
};

// Get deal by activity
const getDealByActivity = async (req, res) => {
    try {
        const { activity } = req.body;
        const deals = await Deal.find({ activities: { $in: [activity] } });
        if (deals) res.json({ success: true, deals });
        res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals by activity.', error });
    }
};

// Get deal by id
const getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (deal) {
            res.json({ success: true, deal });
        }
        res.json({ success: false, message: "Deal not found." });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deal.', error });
    }
};

// Get deal by user
const getDealByUser = async (req, res) => {
    try {
        const deals = await Deal.find({ user: req.body.userId });
        if (deals) res.json({ success: true, deals });
        res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals.', error });
    }
}

// Create deal
const createDeal = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const { placename, cityname, region, country, activities, description, price } = req.body;
        const image = `${req.file.filename}`;
        const city = await City.find({ name: cityname });
        if (!city) {
            res.json({ success: false, message: "Add city first." });
        }
        const deal = await Deal.create({ user, name: placename, city, region, activities, image, description, price });
        if (deal) res.json({ success: true, deal });
        res.json({ success: false, message: 'Error Occured in backend.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to create deal.', error });
    }
};

// Delete deal
const deleteDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (deal) {
            fs.unlink(`uploads/${deal.image}`, () => { });
            await Deal.findByIdAndDelete(req.params.id);
            res.json({ success: true, message: 'Deal removed.' });
        } else {
            res.json({ success: false, message: 'Product not found.' });
        }
    } catch (error) {
        res.json({ success: false, message: 'Failed to delete deal.', error });
    }
};

export { getDeals, getTrendingDeals, getDealByRegion, getDealByCity, getDealByActivity, getDealById, getDealByUser, createDeal, deleteDeal };
