import { Schema, model, Types } from "mongoose";

let collection = "cities";
let schema = new Schema(
    {   //id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        country: { type: String, required: true },
        cover: { type: String, required: true }

    },
    {
        timestamps: true
    }
)

const Category = model(collection, schema);

export default Category;