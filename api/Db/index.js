import mongoose from "mongoose";

export default async function dbConnect() {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Database connected, response: " + res);
    } catch (error) {
        console.log("Database connection failed, error: " + error);
    }
}
