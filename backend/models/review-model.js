import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    deal: { type: Schema.Types.ObjectId, required: true, ref: 'Deal' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
},
    { timestamps: true }
);

const Review = model('Review', reviewSchema);

export default Review;
