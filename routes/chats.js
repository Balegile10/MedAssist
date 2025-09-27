import express from "express";
const router = express.Router();

// Add chat message
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { userId, message, sender } = req.body; // sender: "user" or "ai"

  const result = await db.collection("chats").insertOne({
    userId,
    message,
    sender,
    timestamp: new Date()
  });

  res.json({ msg: "Message saved", chatId: result.insertedId });
});

// Get chat history
router.get("/:userId", async (req, res) => {
  const db = req.app.locals.db;
  const chats = await db.collection("chats")
    .find({ userId: req.params.userId })
    .sort({ timestamp: 1 })
    .toArray();

  res.json(chats);
});

export default router;
