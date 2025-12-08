import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import salesRoutes from "./routes/salesRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.send("Sales API is running ✅");
});

// Routes
app.use("/api/sales", salesRoutes);

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

start();
