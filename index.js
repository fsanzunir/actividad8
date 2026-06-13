const express = require('express');
require('dotenv').config();

const autoresRoutes = require('./src/routes/autores.routes');
const postsRoutes   = require('./src/routes/posts.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/autores', autoresRoutes);
app.use('/api/posts',   postsRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Blog API funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor arrancado en http://localhost:${PORT}`);
});