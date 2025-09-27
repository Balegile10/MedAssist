import express from "express";
const router = express.Router();

// Add symptom history
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { userId, symptoms, adviceGiven } = req.body;

  const result = await db.collection("symptomHistory").insertOne({
    userId,
    symptoms,
    date: new Date(),
    adviceGiven
  });

  res.json({ msg: "Symptom history saved", id: result.insertedId });
});

// Get symptom history
router.get("/:userId", async (req, res) => {
  const db = req.app.locals.db;
  const history = await db.collection("symptomHistory")
    .find({ userId: req.params.userId })
    .sort({ date: -1 })
    .toArray();

  res.json(history);
});

export default router;
