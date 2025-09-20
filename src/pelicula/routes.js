import { Router } from "express";
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest} from "./controller.js";

const peliculaRoutes = Router();
// Definicion de rutas para peliculas
peliculaRoutes.post("/pelicula", handleInsertPeliculaRequest);
peliculaRoutes.get("/peliculas", handleGetPeliculasRequest);
peliculaRoutes.get("/pelicula/:id", handleGetPeliculaByIdRequest);
peliculaRoutes.put("/pelicula/:id", handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete("/pelicula/:id", handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
