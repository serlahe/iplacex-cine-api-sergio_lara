import { Router } from "express";
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest} from "./controller.js";

const actorRoutes = Router();
// Definicion de rutas para actores
actorRoutes.post("/actor", handleInsertActorRequest);
actorRoutes.get("/actores", handleGetActoresRequest);
actorRoutes.get("/actor/:id", handleGetActorByIdRequest);
actorRoutes.get("/actor/pelicula/:pelicula", handleGetActoresByPeliculaIdRequest);

export default actorRoutes;
