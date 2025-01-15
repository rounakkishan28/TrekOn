import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deal: { type: Schema.Types.ObjectId, ref: 'Deal', required: true },
    image: { type: String, required: true },
    dealName: { type: String, required: true },
    cityName: { type: String, required: true },
    country: { type: String, required: true },
    dealDescription: { type: String, required: true },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
}, { timestamps: true });

const Booking = model('Booking', bookingSchema);

export default Booking;
