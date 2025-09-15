import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Data from './models/dataSchema.js';  // Adjust the path if necessary

dotenv.config();  // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const addSampleData = async () => {
    try {
        const sampleData = {
            uuid: "device123",
            fw: "1.0.0",
            serverTimestamp: new Date(),  // Current timestamp
            tts: Math.floor(Date.now() / 1000), // Current time in seconds
            data: {
                temp: 24.5,
                hum: 60,
                pm: 12
            }
        };

        const result = await Data.create(sampleData);
        console.log("Sample data added:", result);
    } catch (error) {
        console.error("Error adding data:", error.message);
    } finally {
        mongoose.disconnect();
    }
};

addSampleData();
