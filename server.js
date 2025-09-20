import express from 'express';
import cors from 'cors';
import { connectDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js"

const app = express();
const PORT = process.env.PORT || 3000;

// uso de los Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta por defecto de la aplicacion
app.get("/", (req, res) => {
  res.send("Bienvenido al cine Iplacex");
});


// Función para iniciar el servidor después de conectar a la BD
async function startServer() {
  try {
    await connectDB();

    // Rutas personalizadas
    app.use("/api", peliculaRoutes);
    app.use("/api", actorRoutes);

    // Levantar servidor solo si conexión exitosa
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
  }
}

startServer();