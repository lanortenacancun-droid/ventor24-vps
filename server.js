const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Ventor24 activo');
});

app.all('/voice', (req, res) => {
  res.type('text/xml');

  const twiml = '<?xml version="1.0" encoding="UTF-8"?><Response><Gather input="speech" action="/procesar" method="POST" timeout="5"><Say voice="Polly.Mia-Neural" language="es-MX">Hola, soy Ventor24. En que puedo ayudarte?</Say></Gather><Say>No escuche nada. Intenta de nuevo.</Say></Response>';

  res.send(twiml);
});

app.all('/procesar', (req, res) => {
  res.type('text/xml');

  const texto = req.body.SpeechResult ? req.body.SpeechResult : '';

  console.log('Texto recibido: ' + texto);

  const respuesta = 'Dijiste: ' + texto;

  const twiml = '<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Mia-Neural" language="es-MX">' + respuesta + '</Say></Response>';

  res.send(twiml);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});
