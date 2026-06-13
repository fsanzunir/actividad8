const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM autores');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [id]);
  return rows[0];
};

const create = async ({ nombre, email, imagen }) => {
  const [result] = await pool.query(
    'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
    [nombre, email, imagen]
  );
  return { id: result.insertId, nombre, email, imagen };
};

const getPostsByAutor = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
       p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
       a.id AS autor_id, a.nombre, a.email, a.imagen
     FROM posts p
     INNER JOIN autores a ON p.autor_id = a.id
     WHERE a.id = ?`,
    [id]
  );
  return rows;
};

module.exports = { getAll, getById, create, getPostsByAutor };