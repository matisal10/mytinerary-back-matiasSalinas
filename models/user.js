import { Schema, model } from "mongoose";

let collection = "users";

let schema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        photo: { type: String, default: 'https://www.pngmart.com/files/22/User-Avatar-Profile-Transparent-Isolated-PNG.png' },
        country: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Users = model(collection, schema);

export default Users;