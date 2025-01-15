import Booking from '../models/booking-model.js';
import Deal from '../models/deal-model.js';
import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';

// Book a deal
const bookDeal = async (req, res) => {
    try {
        const user = req.user;
        const deal = await Deal.findById(req.params.id);
        const price = deal.price;
        const image = deal.image;
        const dealName = deal.name;
        const cityName = deal.cityName;
        const country = deal.country;
        const dealDescription = deal.description;
        const booking = await Booking.create({ user, deal, image, dealName, cityName, country, dealDescription, price });
        res.json({ success: true, booking });
    } catch (error) {
        res.json({ success: false, message: 'Failed to book deal.', error });
    }
};

// Get bookings
const getBookings = async (req, res) => {
    try {
        const user = req.user;
        const bookings = await Booking.find({ user });
        var totalAmount = 0;
        bookings.map((booking)=>{
            totalAmount = totalAmount + booking.price;
        })
        if (bookings) res.json({ success: true, bookings, totalAmount });
        else res.json({ success: false, message: 'Bookings not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch bookings.', error });
    }
};

// Get booking by id
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            res.json({ success: true, booking });
        }
        else res.json({ success: false, message: 'Booking not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch booking.', error });
    }
}

export { bookDeal, getBookings, getBookingById };
