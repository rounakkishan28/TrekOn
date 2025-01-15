import Booking from '../models/booking-model.js';
import Review from '../models/review-model.js';
import Deal from '../models/deal-model.js';
import Wishlist from '../models/wishlist-model.js';
import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

// Get or Search all users
const allUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { firstname: { $regex: req.query.search, $options: "i" } },
            { lastname: { $regex: req.query.search, $options: "i" } },
            { username: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    // Exclude the current user
    const users = await User.find({
      ...keyword,
      _id: { $ne: req.user._id },
    });

    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve users" });
  }
};


// SignUp
const signUp = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const image = `${req.file.filename}`;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.json({ message: 'User already exists.' });
    let user;
    if(!image) user = await User.create({ firstname, lastname, username, email, password });
    else user = await User.create({ photo: image, firstname, lastname, username, email, password });
    const token = generateToken(user._id);
    res.json({ success: true, _id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, image: user.photo, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Failed to signup.' });
  }
};

// SignIn
const signIn = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ $or: [{ email: userId }, { username: userId }] });
  if(!user) return res.json({ success: false, message: "User not found." });
  const token = generateToken(user._id);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      token,
      success: true
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
};

// Update password
const updatePassword = async (req, res) => {
  const { email, password, generatedOtp, otp } = req.body;
  if (!otp || !generatedOtp || otp != generatedOtp) return res.json({ success: false, message: 'Invalid OTP' });
  const user = await User.findOne({ email });
  if (!user) {
      res.json({ message: "User doesn't exist." });
  }
  user.password = password;
  await user.save();
  res.json({ success: true, message: "Password Updated" });
};

// Update Pic
const updatePic = async (req, res) => {
  try{
    const user = req.user;
    const image = `${req.file.filename}`;
    user.photo = image;
    await user.save();
    res.json({ success: true, message: 'Profile Pic Updated.' });
  } catch (error) {
    res.json({ success: false, message: 'Failed to update profile pic.', error });
  }
}

// Get Dashboard
const getDashboard = async (req, res) => {
  try {
    const months = [
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December"
    ];
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized access." });
    }
    const wishlistData = await Wishlist.find({ user });
    let wishlist = wishlistData.length;
    const bookingData = await Booking.find({ user });
    let bookings = bookingData.length;
    const reviewData = await Review.find({ user });
    let reviews = reviewData.length;
    const dealData = await Deal.find({ user });
    let hosted = dealData.length;
    const monthly = months.map((month) => ({
      month,
      hosted: 0,
      bookings: 0,
      reviews: 0
    }));
    dealData.forEach((deal) => {
      const dealMonth = new Date(deal.createdAt).getMonth();
      monthly[dealMonth].hosted += 1;
    });
    bookingData.forEach((booking) => {
      const bookingMonth = new Date(booking.createdAt).getMonth();
      monthly[bookingMonth].bookings += 1;
    });
    reviewData.forEach((review) => {
      const reviewMonth = new Date(review.createdAt).getMonth();
      monthly[reviewMonth].reviews += 1;
    });
    res.json({ success: true, user, bookings, wishlist, reviews, hosted, monthly });
  } catch (error) {
    res.json({ success: false, message: 'Failed to fetch dashboard.', error });
  }
};

// Get profile
const getProfile = async(req,res)=>{
  const user = req.user;
  if(!user) return res.json({ success: false, message: 'Unauthorized access.' });
  res.json({ success: true, user });
};

// Get User
const getUser = async(req, res) => {
  try{
    const user = await User.findById(req.params.id);
    if(!user) return res.json({ success: false, message: 'User not found.' });
    const dealData = await Deal.find({ user });
    const reviewData = await Review.find({ user });
    res.json({ success: true, photo:user.photo, firstname: user.firstname, lastname: user.lastname, username: user.username, hosted: dealData.length, reviews: reviewData.length });
  } catch (error) {
    res.json({ success: false, message: 'Failed to fetch user profile', error });
  }
};

export { allUsers, signUp, signIn, updatePassword, updatePic, getDashboard, getProfile, getUser };
