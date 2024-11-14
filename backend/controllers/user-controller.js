import Booking from '../models/booking-model.js';
import User from '../models/user-model.js';
import Review from '../models/review-model.js';
import jwt from 'jsonwebtoken';
import Deal from '../models/deal-model.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// SignUp
const signUp = async (req, res) => {

};

// SignIn
const signIn = async (req, res) => {

};

// Update Bio
const changeBio = async (req, res) => {

};

// Get Dashboard
const getDashboard = async (req, res) => {
  try {
    const months = [
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December"
    ];
    const user = await User.findById(req.body.userId);
    const wishlistData = user.wishlist;
    let wishlist = Object.keys(wishlistData).length;
    const bookingData = Booking.find({ user });
    let bookings = bookingData.length;
    const reviewData = Review.find({ user });
    let reviews = reviewData.length;
    const dealData = Deal.find({ user });
    let hosted = dealData.length;
    const monthly = months.map((month) => ({
      month,
      bookings: 0,
      reviews: 0
    }));
    bookings.forEach((booking)=>{
      const bookingMonth = new Date(booking.createdAt).getMonth();
      monthly[reviewMonth].reviews += 1;
    });
    reviews.forEach((review) => {
      const reviewMonth = new Date(review.createdAt).getMonth();
      monthly[reviewMonth].reviews += 1;
    });
    res.json({ success: true, bookings, wishlist, reviews, hosted, monthly });
  } catch (error) {
    res.json({ success: false, message: 'Failed to fetch dashboard.', error });
  }
};

export { signUp, signIn, changeBio, getDashboard };
