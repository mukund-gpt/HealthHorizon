import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = { origin: "http://localhost:5173", credentials: true };

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is Listening to port: ${port}`);
});

app.get("/", (req, res) => {
  res.send("QWERTY");
});

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies (for forms)

import authRoutes from "../server/Routes/auth.routes.js";
app.use("/api/auth", authRoutes);

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error :)";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
