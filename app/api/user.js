import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("myDatabase");
  const users = db.collection("users");

  if (req.method === "POST") {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Missing fields" });

    const result = await users.insertOne({ name, email });
    return res.status(201).json({ message: "User created", id: result.insertedId });
  }

  if (req.method === "GET") {
    const allUsers = await users.find({}).toArray();
    return res.status(200).json(allUsers);
  }

  res.status(405).json({ error: "Method not allowed" });
}
