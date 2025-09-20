import { ObjectId } from "mongodb";
import { client, dbName } from "../common/db.js";

const actorCollection = client.db(dbName).collection("actores");
const peliculaCollection = client.db(dbName).collection("peliculas");

// Metodo para insertar un nuevo actor
export async function handleInsertActorRequest(req, res) {
  try {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

    // Metodo para validar que la pelicula exista
    const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(idPelicula) });
    if (!pelicula) {
      return res.status(400).json({ error: "La pelicula asignada no existe" });
    }
    const actor = { idPelicula, nombre, edad, estaRetirado, premios };
    const result = await actorCollection.insertOne(actor);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al insertar actor" });
  }
}


// Metodo para obtener todos los actores
export async function handleGetActoresRequest(req, res) {
  try {
    const actores = await actorCollection.find().toArray();
    res.status(200).json(actores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener actores" });
  }
}


// Metodo para obtener actor por ID
export async function handleGetActorByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const actor = await actorCollection.findOne({ _id: new ObjectId(id) });
    if (!actor) return res.status(404).json({ error: "Actor no encontrado" });
    res.status(200).json(actor);
  } catch (error) {
    res.status(400).json({ error: "Id mal formulado" });
  }
}


// Metodo para obtener actores por ID de pelicula
export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const { pelicula } = req.params;
    const actores = await actorCollection.find({ idPelicula: pelicula }).toArray();
    if (actores.length === 0) {
      return res.status(404).json({ error: "No se encontraron actores para esta pelicula" });
    }
    res.status(200).json(actores);
  } catch (error) {
    res.status(400).json({ error: "Id mal formulado" });
  }
}
