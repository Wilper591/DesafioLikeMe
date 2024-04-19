import { Router } from "express";
const router = Router();
import {
  newPost,
  addLike,
  getPosts,
  deletePosts,
} from "../controllers/likeme.controller.js";

/* Create */
router.post("/post", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const createPost = await newPost(titulo, img, descripcion);
    res.send(createPost);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

/* Read */
router.get("/posts", async (req, res) => {
  try {
    const getPostsList = await getPosts();
    res.send(getPostsList);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

/* Update */
router.put("/post", async (req, res) => {
  try {
    const { id } = req.query;
    const editLike = await addLike(id);
    res.send(editLike);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

/* Delete */
router.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const erasePost = await deletePosts(id);
    res.send(erasePost);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

export default router;
