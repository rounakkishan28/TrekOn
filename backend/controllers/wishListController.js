import Deal from "../models/deal-model.js";
import Wishlist from "../models/wishlist-model.js";
import User from "../models/user-model.js";

// add to wishlist
const addToWishlist = async (req, res) => {
    try {
        const user = req.user;
        const deal = await Deal.findById(req.params.id);
        const price = deal.price;
        await Wishlist.create({ user, deal, dealImage: deal.image,dealName: deal.name, cityName: deal.cityName, country: deal.country, dealdescription: deal.description, price });
        res.json({ success: true, message: "Added to wishlist." });
    } catch (error) {
        res.json({ success: false, message: 'Failed to add to wishlist.', error });
    }
};

// remove from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const user = req.user;
        const deal = await Deal.findById(req.params.id);
        await Wishlist.findOneAndDelete({ $and: [{ user }, { deal }] });
        res.json({ success: true, message: "Removed from wishlist." });
    } catch (error) {
        res.json({ success: false, message: 'Failed to remove from wishlist.', error });
    }
};

// Fetch wishlist
const getWishlist = async (req, res) => {
    try {
        const user = req.user;
        const wishlist = await Wishlist.find({ user });
        res.json({ success: true, wishlist });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch wishlist.', error });
    }
};

export { addToWishlist, removeFromWishlist, getWishlist };
