import { ObjectId } from "mongodb";
// schemas de la coleccion "peliculas"
export const Pelicula = {
  _id: ObjectId,
  nombre: String,
  generos: Array,
  anioEstreno: Number
};
