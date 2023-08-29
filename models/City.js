import { Schema, model, Types } from "mongoose";
import itinerarySchema from "./Itineraries.js"; 
let collection = "cities";

// const itinerarySchema = new Schema({
//     name: { type: String, required: true },
//     guideName: { type: String, required: true },
//     photo: { type: String, required: true },
//     price: { type: Number, min: 1, max: 5, required: true },
//     duration: { type: Number, required: true },
//     likes: { type: Number, default: 0 },
//     hashtags: [{ type: String }],
//     images: [{ type: String }],
//     activities: [],
//     comments: []
// });


let schema = new Schema(
    {   //id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        country: { type: String, required: true },
        cover: { type: String, required: true },
        itineraries: [itinerarySchema]
    },
    {
        timestamps: true
    }
)

const City = model(collection, schema);

export default City;