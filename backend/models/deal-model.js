import { Schema, model } from "mongoose";

const dealSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    region: { type: String, required: true },
    activities: { type: Array, required: true },
    trending: { type: Boolean, default: false },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Deal = model('Deal', dealSchema);

export default Deal;