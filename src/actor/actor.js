import { ObjectId } from "mongodb";
// schemas de la coleccion "actor"
export const Actor = {
  _id: ObjectId,
  idPelicula: String,
  nombre: String,
  edad: Number,
  estaRetirado: Boolean,
  premios: Array
};
