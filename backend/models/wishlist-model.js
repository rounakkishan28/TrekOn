import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deal: { type: Schema.Types.ObjectId, ref: 'Deal', required: true },
    dealImage: { type: String, required: true },
    dealName: { type: String, required: true },
    cityName: { type: String, required: true },
    country: { type: String, required: true },
    dealdescription: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Wishlist = model('Wishlist', wishlistSchema);

export default Wishlist;
