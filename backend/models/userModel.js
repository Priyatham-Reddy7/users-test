import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
        },
        branch: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
