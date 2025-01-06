import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("Connected to MONGODB successfully");
    } catch (error) {
        console.log(error);
    }
};
