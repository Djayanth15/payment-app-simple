import mongoose from "mongoose";

const DB_NAME = "PaytmApp";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB connected ! !  DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
