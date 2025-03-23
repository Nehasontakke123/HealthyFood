import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db/connectionDB.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 6000;

// **MongoDB Connection**
connectDB(process.env.DBURL, process.env.DBNAME);

const app = express();

// **Middlewares**
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// **Routes**
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

// **Static Folder for Uploaded Images**
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads"))); 

// **Start Server**
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
