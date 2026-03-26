
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

const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("🚀 Ventor24 funcionando");
});

server.listen(PORT, () => {
  console.log(Servidor corriendo en puerto ${PORT});
});
 e513c0a54f34b92c513aa1e063d00709e3bc396a
