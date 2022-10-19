import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import employeeRoute from "./routes/employee.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const createConnection = () => {
  mongoose.connect(MONGO_URL);
  console.log(`mongoose is connnected`);
};

app.listen(PORT, () => {
  createConnection();
  console.log(`server is listening on ${PORT}`);
});

app.use("/api/auth", authRoute);
app.use("/api/employee", employeeRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});
