import { Schema, model } from "mongoose";

const citySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    country: { type: String, required: true },
}, { timestamps: true });

const City = model('City', citySchema);

export default City;
