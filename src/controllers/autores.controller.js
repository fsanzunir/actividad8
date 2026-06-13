const Autor = require('../models/autores.model');

const getAll = async (req, res) => {
  try {
    const autores = await Autor.getAll();
    res.json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
};

const getById = async (req, res) => {
  try {
    const autor = await Autor.getById(req.params.id);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(autor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, email, imagen } = req.body;
    if (!nombre || !email) {
      return res.status(400).json({ error: 'nombre y email son obligatorios' });
    }
    const nuevoAutor = await Autor.create({ nombre, email, imagen });
    res.status(201).json(nuevoAutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
};

const getPostsByAutor = async (req, res) => {
  try {
    const autor = await Autor.getById(req.params.id);
    if (!autor) return res.status(404).json({ error: 'Autor no encontrado' });

    const posts = await Autor.getPostsByAutor(req.params.id);
    res.json({ autor, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los posts del autor' });
  }
};

module.exports = { getAll, getById, create, getPostsByAutor };