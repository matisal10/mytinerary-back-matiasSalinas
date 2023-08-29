import { Schema } from "mongoose";

const itinerarySchema = new Schema({
    name: { type: String, required: true },
    guideName: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, min: 1, max: 5, required: true },
    duration: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    hashtags: [{ type: String }],
    images: [{ type: String }],
    activities: [],
    comments: []
});

export default itinerarySchema;