import { Schema, model, Types } from "mongoose";

let collection = "cities";
let schema = new Schema(
    {   id: { type: String, required: true },
        name: { type: String, required: true },
        photo: { type: String, required: true },
        country: { type: String, required: true },

    },
    {
        timestamps: true
    }
)

let Category = model(collection,schema);

export default Category;