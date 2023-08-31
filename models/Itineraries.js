import { Schema, model, Types } from "mongoose";

let collection = "Itinerary";

const itinerarySchema = new Schema({
    name: { type: String, required: true },
    guideName: { type: String, required: true },
    guidePhoto: { type: String, required: true },
    price: { type: Number, min: 1, max: 5, required: true },
    duration: { type: Number, required: true },
    cover: {type: String, required: true},
    likes: { type: Number, default: 0 },
    hashtags: [{ type: String }],
    images: [{ type: String }],
    activities: [],
    comments: []
});

const Itinerary = model(collection, itinerarySchema);

export default Itinerary;
