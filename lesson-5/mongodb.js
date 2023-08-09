const { MongoClient } = require("mongodb");

const DB_URI =
  "mongodb+srv://student:wHho8av9GH0CkIrk@myfirstcluster.b8w0szf.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(DB_URI);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();
