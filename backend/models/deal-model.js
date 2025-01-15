import { Schema, model } from "mongoose";

const dealSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    cityName: { type: String, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    mountain: { type: Boolean, default: false },
    aerial: { type: Boolean, default: false },
    beach: { type: Boolean, default: false },
    nature: { type: Boolean, default: false },
    urban: { type: Boolean, default: false },
    winter: { type: Boolean, default: false },
    desert: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Deal = model('Deal', dealSchema);

export default Deal;