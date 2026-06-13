const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    `SELECT 
       p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
       a.id AS autor_id, a.nombre, a.email, a.imagen
     FROM posts p
     INNER JOIN autores a ON p.autor_id = a.id`
  );
  return rows.map(formatPost);
};

const getById = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
       p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
       a.id AS autor_id, a.nombre, a.email, a.imagen
     FROM posts p
     INNER JOIN autores a ON p.autor_id = a.id
     WHERE p.id = ?`,
    [id]
  );
  return rows[0] ? formatPost(rows[0]) : null;
};

const create = async ({ titulo, descripcion, categoria, autor_id }) => {
  const [result] = await pool.query(
    `INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, autor_id)
     VALUES (?, ?, NOW(), ?, ?)`,
    [titulo, descripcion, categoria, autor_id]
  );
  return getById(result.insertId);
};

const formatPost = (row) => ({
  id:             row.id,
  titulo:         row.titulo,
  descripcion:    row.descripcion,
  fecha_creacion: row.fecha_creacion,
  categoria:      row.categoria,
  autor: {
    id:     row.autor_id,
    nombre: row.nombre,
    email:  row.email,
    imagen: row.imagen,
  },
});

module.exports = { getAll, getById, create };