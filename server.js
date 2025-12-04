import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());

const uri = "mongodb+srv://levelup_user:Levelup2024@levelup.uwl1n99.mongodb.net/?retryWrites=true&w=majority&appName=levelup";
const client = new MongoClient(uri);

// Ruta principal para probar conexión
app.get("/", (req, res) => {
  res.send("🚀 API LevelUp MongoDB funcionando correctamente");
});

// Endpoint para obtener todos los productos
app.get("/api/products", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("levelup");
    const collection = db.collection("products");
    const products = await collection.find().toArray();
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error al conectar con MongoDB" });
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
