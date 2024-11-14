import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to MongoDB 👍`);
    } catch(error){
        console.error(`ERROR: Failed while connecting to MongoDB, ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
