import { MongoClient } from "mongodb";

// Conexion al cluster de MongoDB Atlas
const uri = "mongodb+srv://eva3_express:bFR2tPZehlTyKJtc@cluster-express.vdk5jio.mongodb.net/?retryWrites=true&w=majority&appName=cluster-express";

const client = new MongoClient(uri);

const dbName = "cine-db";

// Función para conectar a la DB
export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Conexión a MongoDB Atlas establecida");
    return client.db(dbName);
  } catch (error) {
    console.error("Error al conectar a MongoDB Atlas:", error);
    throw error;
  }
}

export { client, dbName };
