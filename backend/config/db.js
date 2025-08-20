import mongoose from "mongoose";
import { ENV_VARS } from "./env.Vars.js";

export const dbConnection = async () => {
  try {
    if (!ENV_VARS.MONGODB_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    await mongoose.connect(ENV_VARS.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000, 
      family: 4, 
    });

    console.log('✅ MongoDB connected successfully');

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected from DB');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Possible causes:');
      console.error('- Incorrect connection string');
      console.error('- Network connectivity issues');
      console.error('- MongoDB server not running');
      console.error('- Firewall blocking connection');
    }

    process.exit(1);
  }
};