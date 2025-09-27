import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";

// Routes
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chats.js";
import reminderRoutes from "./routes/reminders.js";
import symptomRoutes from "./routes/symptoms.js";
import emergencyRoutes from "./routes/emergency.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("medassist");
    app.locals.db = db;
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
}
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/emergency", emergencyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
