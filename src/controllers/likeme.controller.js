import { pool } from "../db.js";

/* Genera un nuevo post  */
const newPost = async (titulo, img, descripcion) => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");
    const likes = 0;
    const text = `INSERT INTO posts(titulo, img, descripcion, likes) VALUES($1,$2,$3,$4) RETURNING *;`;
    const values = [titulo, img, descripcion, likes];
    const result = await pool.query(text, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo crear el nuevo Post",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Nuevo Post Creado Exitosamente",
        code: 200,
        post: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Nuevo Post Creado Exitosamente",
        code: 200,
        post: result.rows,
      };
    }
  } catch (error) {
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Nuevo Post fallido",
    });
  }
};

const addLike = async (id) => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");
    const text = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;";
    const values = [id];
    const result = await pool.query(text, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo agregar un nuevo Like",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Nuevo Like Agregado Correctamente",
        code: 200,
        post: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Nuevo Like Agregado Correctamente",
        code: 200,
        post: result.rows,
      };
    }
  } catch (error) {
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Nuevo Like fallido",
    });
  }
};

/* Trae todos los posts */
const getPosts = async () => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");

    const text = "SELECT * FROM posts ORDER BY id ASC;";
    const result = await pool.query(text);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se acceder a los Posts",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Listado de Posts Obtenido Correctamente",
        code: 200,
        post: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Listado de Posts Obtenido Correctamente",
        code: 200,
        post: result.rows,
      };
    }
  } catch (error) {
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Consulta al listado de Posts fallido",
    });
  }
};

/* Elimina un post */
const deletePosts = async (id) => {
  try {
    /* Inicia la transacción */
    console.log("BEGIN START");
    await pool.query("BEGIN");

    const text = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id]
    const result = await pool.query(text, values);

    if (!result.rowCount) {
      /* Error */
      const rollback = "ROLLBACK";
      await pool.query(rollback);
      console.log({
        status: "Error",
        message: "No se pudo Eliminar el Post",
        code: 500,
      });
    } else {
      /* Success */
      console.log({
        status: "Success",
        message: "Post Eliminado Correctamente",
        code: 200,
        post: result.rows,
      });
      /* Termina la transacción */
      await pool.query("COMMIT");
      console.log("COMMIT END");
      return {
        status: "Success",
        message: "Post Eliminado Correctamente",
        code: 200,
        post: result.rows,
      };
    }
  } catch (error) {
    return console.log({
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      mensajeDelProgramador: "Eliminación de Post fallido",
    });
  }
};

export { newPost, addLike, getPosts, deletePosts };
