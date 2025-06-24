import mongoose from "mongoose";
import  DB_NAME  from "../constants.js";
const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `db is connected established ! DB host ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("db connection failed",error);
    process.exit();
  }
};
export default connectDB;
