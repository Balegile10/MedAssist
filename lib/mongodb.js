
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

const options = {};

let client = null;
let clientPromise = null;

// Lazily create/connect the MongoClient. This avoids runtime/build-time
// errors when modules are imported before `.env.local` is loaded (Turbopack).
async function getClient() {
  // Ensure .env.local is loaded when this function runs in the server process.
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    // Force override so the value from .env.local takes effect in the running
    // process even if something else set the same key earlier.
    dotenv.config({ path: envPath, override: true });
  } catch (e) {
    // Non-fatal; continue — dotenv failure will surface as missing URI later.
    console.error('dotenv.config error (ignored):', e && e.message);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
  }

  if (client) return client;

  if (process.env.NODE_ENV === "development") {
    // In development, use a global to preserve the client across module reloads.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  client = await clientPromise;
  return client;
}

export { getClient };
