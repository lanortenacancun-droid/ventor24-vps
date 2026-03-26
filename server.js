const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

// Ruta base
app.get('/', (req, res) => {
  res.send('Ventor24 activo 🚀');
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});
