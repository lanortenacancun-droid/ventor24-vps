const express = require('express');
const app = express();

// Middleware para recibir datos de Twilio
app.use(express.urlencoded({ extended: true }));

// Ruta principal (para probar en navegador)
app.get('/', (req, res) => {
  res.send('Ventor24 activo');
});

// Ruta que Twilio va a usar cuando llamen
app.post('/voice', (req, res) => {
  res.set('Content-Type', 'text/xml');

  res.send(`
    <Response>
      <Say voice="Polly.Mia-Neural" language="es-MX">
        Hola, soy Ventor24. ¿En qué puedo ayudarte hoy?
      </Say>
    </Response>
  `);
});

// Puerto (IMPORTANTE para Railway después)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});       