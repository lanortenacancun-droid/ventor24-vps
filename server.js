
        Hola, soy Ventor24. ¿En qué puedo ayudarte hoy?
      </Say>
    </Response>
  `);
});

// Puerto (IMPORTANTE para Railway después)
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Ventor24 activo');
});

app.get('/voice', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(`
<Response>
  <Say voice="Polly.Mia-Neural" language="es-MX">
    Hola, soy Ventor24.
  </Say>
</Response>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto ' + PORT);
});
