import { Schema, model } from "mongoose";
import Itinerary from "./Itineraries.js"; // Importa el modelo de itinerario

let collection = "cities";

let schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        country: { type: String, required: true },
        cover: { type: String, required: true },
        itineraries: [{ type: Schema.Types.ObjectId, ref: 'Itinerary' }] // Usa referencias a documentos de itinerario
    },
    {
        timestamps: true
    }
);

const City = model(collection, schema);

export default City;