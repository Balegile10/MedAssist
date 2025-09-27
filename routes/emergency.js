import express from "express";
const router = express.Router();

// Add emergency request
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const { userId, type, location } = req.body; // type: "ambulance" or "clinic"

  const result = await db.collection("emergencyRequests").insertOne({
    userId,
    type,
    location,
    status: "pending",
    requestedAt: new Date()
  });

  res.json({ msg: "Emergency request saved", requestId: result.insertedId });
});

// Get emergency requests for user
router.get("/:userId", async (req, res) => {
  const db = req.app.locals.db;
  const requests = await db.collection("emergencyRequests")
    .find({ userId: req.params.userId })
    .sort({ requestedAt: -1 })
    .toArray();

  res.json(requests);
});

export default router;
