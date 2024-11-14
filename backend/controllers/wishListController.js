import User from "../models/user-model.js";

// add to wishlist
const addToWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const wishlist = await user.wishlist;
        if (!wishlist[req.body.itemId]) {
            wishlist[req.body.itemId] = 1;
        } else {
            res.json({ success: false, message: "Already added to wishlist." });
        }
        await User.findByIdAndUpdate(req.body.userId, { wishlist });
        res.json({ success: true, message: "Added to wishlist." });
    } catch (error) {
        res.json({ success: false, message: 'Failed to add to wishlist.', error });
    }
};

// remove from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const wishlist = await user.wishlist;
        if (!wishlist[req.body.itemId]) {
            res.json({ success: false, message: "Not present in wishlist." });
        } else {
            wishlist[req.body.itemId] = 0;
        }
        await User.findByIdAndUpdate(req.body.userId, { wishlist });
        res.json({ success: true, message: "Remove from cart." });
    } catch (error) {
        res.json({ success: false, message: 'Failed to remove from wishlist.', error });
    }
};

// Fetch wishlist
const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const wishlist = await user.wishlist;
        if(wishlist) res.json({ success: true, wishlist });
        res.json({ success: false, message: 'Wishlist not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch wishlist.', error });
    }
};

export { addToWishlist, removeFromWishlist, getWishlist };
