import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deal: { type: Schema.Types.ObjectId, ref: 'Deal', required: true },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
}, { timestamps: true });

const Booking = model('Booking', bookingSchema);

export default Booking;
