// import { MongoClient } from "mongodb";
const { MongoClient } = require("mongodb");


const connectionString = "mongodb://localhost:27017";

async function connectToDatabase() {
  try {
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    console.log("Successfully connected to MongoDB!");

    const database = client.db("hammad");
    const collection = database.collection("customers");

    const documents = await collection.find({}).toArray();
    console.log("Documents:", documents);

    await client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
  }
}

connectToDatabase();

process.on("SIGINT", () => {
  console.log("Closing MongoDB connection...");
  // No need to explicitly close the connection here, as it's already handled in the `finally` block
});
