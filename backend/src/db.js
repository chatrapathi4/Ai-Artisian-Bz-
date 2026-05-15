import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
