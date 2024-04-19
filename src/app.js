import rutas from "./routes/index.routes.js";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//Rutas
app.use("/apiV1", rutas);

//Ruta Genérica
app.get("*", (req, res) => {
  res.send(`<h1>Esta página No Existe</h1>`);
});

export { app, PORT };
