import { Router } from "express";
import rutasLikeme from "./likeme.routes.js";
const router = Router();

//Rutas Principal
router.get("/", (req, res) => {
  try {
    res.sendFile("index.html");
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

router.use("/likeme", rutasLikeme);

export default router;
