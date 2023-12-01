import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const ConnectDb = async () => {
    try {
        
        const MongoUrl = process.env.MONGOOSECONNECTIONSTRING;
        const connections = await mongoose.connect(MongoUrl)
        console.log("connected MongoDb");
        return connections;

    } catch (error) {
        console.error("Error",error);
    }
}


export default ConnectDb;