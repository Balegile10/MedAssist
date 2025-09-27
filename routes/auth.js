import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const db = req.app.locals.db;
  const { name, email, password, language } = req.body;

  const userExists = await db.collection("users").findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await db.collection("users").insertOne({
    name,
    email,
    passwordHash,
    role: "patient",
    language,
    createdAt: new Date()
  });

  res.json({ msg: "User registered", userId: result.insertedId });
});

// Login user
router.post("/login", async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  res.json({ msg: "Login successful", userId: user._id });
});

export default router;
