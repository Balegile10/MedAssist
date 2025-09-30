import express from "express";
const router = express.Router();

// Add reminder
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { userId, title, time, repeat } = req.body;

  const result = await db.collection("reminders").insertOne({
    userId,
    title,
    time: new Date(time),
    repeat,
    createdAt: new Date()
  });

  res.json({ msg: "Reminder added", reminderId: result.insertedId });
});

// Get reminders
router.get("/:userId", async (req, res) => {
  const db = req.app.locals.db;
  const reminders = await db.collection("reminders")
    .find({ userId: req.params.userId })
    .toArray();

  res.json(reminders);
});

export default router;
