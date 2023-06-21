import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import userroute from "./routes/user.js";
import blogroute from "./routes/blog.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const mongoconnect = async () => {
  try {
    await mongoose.connect(process.env.MongoUrl);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
app.use("/api/auth", userroute);
app.use("/api/blog", blogroute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(4000, () => {
  mongoconnect();
  console.log("Servers up");
});
