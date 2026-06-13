const Post = require('../models/posts.model');

const getAll = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

const getById = async (req, res) => {
  try {
    const post = await Post.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el post' });
  }
};

const create = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, autor_id } = req.body;
    if (!titulo || !descripcion || !categoria || !autor_id) {
      return res.status(400).json({ error: 'titulo, descripcion, categoria y autor_id son obligatorios' });
    }
    const nuevoPost = await Post.create({ titulo, descripcion, categoria, autor_id });
    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el post' });
  }
};

module.exports = { getAll, getById, create };