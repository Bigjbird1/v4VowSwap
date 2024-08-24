import { MongoClient } from "mongodb";

// This lib is used to connect to the database

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!uri) {
  console.error("⚠️ MONGODB_URI is missing from .env");
} else if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the MongoClient across module reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best not to use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

if (!clientPromise) {
  throw new Error("MongoClient Promise could not be created");
}

export default clientPromise;
