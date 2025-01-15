import fs from 'fs';
import Deal from '../models/deal-model.js';
import City from '../models/city-model.js';
import Review from '../models/review-model.js';
import Wishlist from '../models/wishlist-model.js';
import User from '../models/user-model.js';

// Get deals
const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find({});
        if (deals) res.json({ success: true, deals });
        else res.json({ success: false, message: 'Deals not found.' });
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
        if (trendingDeals) res.json({ success: true, trendingDeals });
        else res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals.', error });
    }
};

// Get deals by region
const getDealByRegion = async (req, res) => {
    try {
        const { id } = req.params;
        var region = null;
        if (id === '0') region = 'Mountain Ranges';
        else if (id === '1') region = 'Beaches';
        else if (id === '2') region = 'Forests';
        else if (id === '3') region = 'Deserts';
        else if (id === '4') region = 'Lakes and Rivers';
        else if (id === '5') region = 'Waterfalls';
        else if (id === '6') region = 'Islands and Archipelagos';
        else if (id === '7') region = 'Caves and Caverns';
        else if (id === '8') region = 'Wetlands and Marshes';
        else if (id === '9') region = 'Glaciers and Polar';
        else if (id === '10') region = 'Canyons and Gorges';
        else if (id === '11') region = 'Volcanoes';
        const deals = await Deal.find({ region: region });
        if (deals) res.json({ success: true, deals });
        else res.json({ success: false, message: 'Deals not found.' });
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
        const deals = await Deal.find({ city });
        res.json({ success: true, deals, cityName, cityCountry });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals by city.', error });
    }
};

// Get deal by activity
const getDealByActivity = async (req, res) => {
    try {
        const id = req.params.id;
        if (id < 0 || id > 6) return res.json({ success: false, message: "Invalid activity." });
        let activity;
        if (id == 0) activity = 'mountain';
        else if (id == 1) activity = 'aerial';
        else if (id == 2) activity = 'beach';
        else if (id == 3) activity = 'nature';
        else if (id == 4) activity = 'urban';
        else if (id == 5) activity = 'winter';
        else if (id == 6) activity = 'desert';
        const deals = await Deal.find({ [activity]: true });
        if (deals) res.json({ success: true, deals });
        else res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals by activity.', error });
    }
};

// Get deal by id
const getDealById = async (req, res) => {
    try {
        const user = req.user;
        const deal = await Deal.findById(req.params.id);
        const hosted = await User.findById(deal.user);
        const reviews = await Review.find({ deal });
        const wishlistItem = await Wishlist.findOne({ $and: [{ user }, { deal }]});
        if (deal) {
            if(wishlistItem) res.json({ success: true, deal, reviews, wishlist: true, hosted });
            else res.json({ success: true, deal, reviews, wishlist: false, hosted });
        }
        else res.json({ success: false, message: "Deal not found." });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deal.', error });
    }
};

// Get deal by user
const getDealByUser = async (req, res) => {
    try {
        const user = req.user;
        const deals = await Deal.find({ user });
        if (deals) res.json({ success: true, deals });
        else res.json({ success: false, message: 'Deals not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch deals.', error });
    }
};

// Create deal
const createDeal = async (req, res) => {
    try {
        const user = req.user;
        const { name, city, region, country, description, price, mountain, aerial, beach, nature, urban, winter, desert } = req.body;
        const image = `${req.file.filename}`;
        const cityname = await City.findOne({ $and: [{ name: city, country: country }] });
        if (!city) {
            res.json({ success: false, message: "Add city first." });
        }
        const deal = await Deal.create({ user, name, city: cityname, cityName: city, country, region, mountain, aerial, beach, nature, urban, winter, desert, image, description, price });
        if (deal) res.json({ success: true, deal });
        else res.json({ success: false, message: 'Error Occured in backend.' });
    } catch (error) {
        console.error(error)
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
            res.json({ success: false, message: 'Deal not found.' });
        }
    } catch (error) {
        res.json({ success: false, message: 'Failed to delete deal.', error });
    }
};

export { getDeals, getTrendingDeals, getDealByRegion, getDealByCity, getDealByActivity, getDealById, getDealByUser, createDeal, deleteDeal };
