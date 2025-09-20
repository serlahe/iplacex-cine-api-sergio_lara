import { ObjectId } from "mongodb";
import { client, dbName } from "../common/db.js";

const peliculaCollection = client.db(dbName).collection("peliculas");

// Funcion que permite agregar una pelicula
export async function handleInsertPeliculaRequest(req, res) {
  try {
    const { nombre, generos, anioEstreno } = req.body;
    const pelicula = { nombre, generos, anioEstreno };
    const result = await peliculaCollection.insertOne(pelicula);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al insertar pelicula" });
  }
}

// Funcion que permite obtener todas las peliculas
export async function handleGetPeliculasRequest(req, res) {
  try {
    const peliculas = await peliculaCollection.find().toArray();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener peliculas" });
  }
}

// Funcion que permite obtener una pelicula por ID
export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(id) });
    if (!pelicula) return res.status(404).json({ error: "Pelicula no encontrada" });
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(400).json({ error: "Id mal escrito" });
  }
}

// Funcion que permite actualizar una pelicula por ID
export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const update = { $set: req.body };
    const result = await peliculaCollection.updateOne({ _id: new ObjectId(id) }, update);
    if (result.matchedCount === 0) return res.status(404).json({ error: "Pelicula no encontrada" });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Id mal escrito" });
  }
}

// Funcion que permite eliminar una pelicula por ID
export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const result = await peliculaCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Pelicula no encontrada" });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Id mal escrito" });
  }
}
